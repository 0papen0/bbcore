"use strict";
/// <reference path="uglify-js.d.ts" />
function isRequire(symbolDef) {
    return (symbolDef != null &&
        symbolDef.undeclared &&
        symbolDef.global &&
        symbolDef.name === "require");
}
function constParamOfCallRequire(node) {
    if (node instanceof AST_Call) {
        let call = node;
        if (call.args.length === 1 &&
            call.expression instanceof AST_SymbolRef &&
            isRequire(call.expression.thedef)) {
            let arg = call.args[0];
            if (arg instanceof AST_String) {
                return arg.value;
            }
        }
    }
    return undefined;
}
function isExports(node) {
    if (node instanceof AST_SymbolRef) {
        let thedef = node.thedef;
        // thedef could be null because it could be already renamed/cloned ref
        if (thedef != null &&
            thedef.global &&
            thedef.undeclared &&
            thedef.name === "exports")
            return true;
    }
    return false;
}
function matchPropKey(propAccess) {
    let name = propAccess.property;
    if (name instanceof AST_String) {
        name = name.value;
    }
    if (typeof name === "string") {
        return name;
    }
    return undefined;
}
function paternAssignExports(node) {
    if (node instanceof AST_Assign) {
        let assign = node;
        if (assign.operator === "=") {
            if (assign.left instanceof AST_PropAccess) {
                let propAccess = assign.left;
                if (isExports(propAccess.expression)) {
                    let name = matchPropKey(propAccess);
                    if (name !== undefined) {
                        return {
                            name,
                            value: assign.right
                        };
                    }
                }
            }
        }
    }
    return undefined;
}
function patternDefinePropertyExportsEsModule(call) {
    //Object.defineProperty(exports, "__esModule", { value: true });
    if (call.args.length === 3 && isExports(call.args[0])) {
        if (call.expression instanceof AST_PropAccess) {
            let exp = call.expression;
            if (matchPropKey(exp) === "defineProperty") {
                if (exp.expression instanceof AST_SymbolRef) {
                    let symb = exp.expression;
                    if (symb.name === "Object")
                        return true;
                }
            }
        }
    }
    return false;
}
function isConstantSymbolRef(node) {
    if (node instanceof AST_SymbolRef) {
        let def = node.thedef;
        if (def.undeclared)
            return false;
        if (def.orig.length !== 1)
            return false;
        if (def.orig[0] instanceof AST_SymbolDefun)
            return true;
    }
    return false;
}
function check(name, order, visited, cache) {
    let cached = cache[name.toLowerCase()];
    let reexportDef = undefined;
    if (cached === undefined) {
        let fileContent = bb.readContent(name);
        //console.log("============== START " + name);
        //console.log(fileContent);
        let ast = parse(fileContent);
        //console.log(ast.print_to_string({ beautify: true }));
        ast.figure_out_scope();
        cached = {
            name,
            ast,
            requires: [],
            difficult: false,
            selfexports: [],
            exports: undefined,
            pureFuncs: Object.create(null)
        };
        let pureMatch = fileContent.match(/^\/\/ PureFuncs:.+/gm);
        if (pureMatch) {
            pureMatch.forEach(m => {
                m
                    .toString()
                    .substr(m.indexOf(":") + 1)
                    .split(",")
                    .forEach(s => {
                    if (s.length === 0)
                        return;
                    cached.pureFuncs[s.trim()] = true;
                });
            });
        }
        if (ast.globals.has("module")) {
            cached.difficult = true;
            ast = parse(`(function(){ var exports = {}; var module = { exports: exports }; var global = this; ${bb.readContent(name)}
__bbe['${name}']=module.exports; }).call(window);`);
            cached.ast = ast;
            cache[name.toLowerCase()] = cached;
            order.push(cached);
            return;
        }
        let exportsSymbol = ast.globals.get("exports");
        let unshiftToBody = [];
        let selfExpNames = Object.create(null);
        let varDecls = null;
        let walker = new TreeWalker((node, descend) => {
            if (node instanceof AST_Block) {
                node.body = node.body
                    .map((stm) => {
                    if (stm instanceof AST_Directive) {
                        // skip "use strict";
                        return undefined;
                    }
                    else if (stm instanceof AST_SimpleStatement) {
                        let stmbody = stm
                            .body;
                        let pea = paternAssignExports(stmbody);
                        if (pea) {
                            let newName = "__export_" + pea.name;
                            if (selfExpNames[pea.name] &&
                                stmbody instanceof AST_Assign) {
                                stmbody.left = new AST_SymbolRef({
                                    name: newName,
                                    thedef: ast.variables.get(newName)
                                });
                                return stm;
                            }
                            if (isConstantSymbolRef(pea.value)) {
                                selfExpNames[pea.name] = true;
                                let def = pea.value
                                    .thedef;
                                def.bbAlwaysClone = true;
                                cached.selfexports.push({
                                    name: pea.name,
                                    node: pea.value
                                });
                                return undefined;
                            }
                            let newVar = new AST_Var({
                                start: stmbody.start,
                                end: stmbody.end,
                                definitions: [
                                    new AST_VarDef({
                                        name: new AST_SymbolVar({
                                            name: newName,
                                            start: stmbody.start,
                                            end: stmbody.end
                                        }),
                                        value: pea.value
                                    })
                                ]
                            });
                            let symb = ast.def_variable(newVar.definitions[0].name);
                            symb.undeclared = false;
                            symb.bbAlwaysClone = true;
                            selfExpNames[pea.name] = true;
                            cached.selfexports.push({
                                name: pea.name,
                                node: new AST_SymbolRef({
                                    name: newName,
                                    thedef: symb
                                })
                            });
                            return newVar;
                        }
                        if (stmbody instanceof AST_Call) {
                            let call = stmbody;
                            if (patternDefinePropertyExportsEsModule(call))
                                return undefined;
                            if (call.args.length === 1 &&
                                call.expression instanceof
                                    AST_SymbolRef) {
                                let symb = call.expression;
                                if (symb.thedef === reexportDef) {
                                    let req = constParamOfCallRequire(call.args[0]);
                                    if (req != null) {
                                        let reqr = bb.resolveRequire(req, name);
                                        if (cached.requires.indexOf(reqr) < 0)
                                            cached.requires.push(reqr);
                                        cached.selfexports.push({
                                            reexport: reqr
                                        });
                                        return undefined;
                                    }
                                }
                            }
                        }
                    }
                    else if (stm instanceof AST_Defun) {
                        let fnc = stm;
                        if (fnc.name.name === "__export") {
                            reexportDef = fnc.name.thedef;
                            return undefined;
                        }
                    }
                    return stm;
                })
                    .filter(stm => {
                    return stm != null;
                });
                descend();
                return true;
            }
            if (node instanceof AST_PropAccess) {
                if (!(walker.parent() instanceof AST_Assign) ||
                    !(walker.parent(1) instanceof
                        AST_SimpleStatement)) {
                    let propAccess = node;
                    if (isExports(propAccess.expression)) {
                        let key = matchPropKey(propAccess);
                        if (key) {
                            if (selfExpNames[key])
                                return false;
                            let newName = "__export_" + key;
                            if (varDecls == null) {
                                let vartop = parse("var a;");
                                let stm = vartop.body[0];
                                unshiftToBody.push(stm);
                                varDecls = stm.definitions;
                                varDecls.pop();
                            }
                            let symbVar = new AST_SymbolVar({
                                name: newName,
                                start: node.start,
                                end: node.end
                            });
                            varDecls.push(new AST_VarDef({
                                name: symbVar,
                                value: undefined
                            }));
                            let symb = ast.def_variable(symbVar);
                            symb.undeclared = false;
                            symb.bbAlwaysClone = true;
                            selfExpNames[key] = true;
                            cached.selfexports.push({
                                name: key,
                                node: new AST_SymbolRef({
                                    name: newName,
                                    thedef: symb
                                })
                            });
                            return false;
                        }
                    }
                }
            }
            let req = constParamOfCallRequire(node);
            if (req != null) {
                let reqr = bb.resolveRequire(req, name);
                let parent = walker.parent();
                if (parent instanceof AST_VarDef) {
                    let vardef = parent;
                    vardef.name.thedef.bbRequirePath = reqr;
                }
                if (cached.requires.indexOf(reqr) < 0)
                    cached.requires.push(reqr);
            }
            return false;
        });
        ast.walk(walker);
        ast.body.unshift(...unshiftToBody);
        //console.log(ast.print_to_string({ beautify: true }));
        cache[name.toLowerCase()] = cached;
    }
    cached.requires.forEach(r => {
        const lowerR = r.toLowerCase();
        if (visited.indexOf(lowerR) >= 0)
            return;
        visited.push(lowerR);
        check(r, order, visited, cache);
    });
    cached.exports = Object.create(null);
    cached.selfexports.forEach(exp => {
        if (exp.name) {
            cached.exports[exp.name] = exp.node;
        }
        else if (exp.reexport) {
            let reexModule = cache[exp.reexport.toLowerCase()];
            if (reexModule.exports) {
                Object.assign(cached.exports, reexModule.exports);
            }
            else {
                reexModule.selfexports.forEach(exp2 => {
                    if (exp2.name) {
                        cached.exports[exp2.name] = exp2.node;
                    }
                });
            }
        }
    });
    order.push(cached);
}
function renameSymbol(node) {
    if (node instanceof AST_Symbol) {
        let symb = node;
        if (symb.thedef == null)
            return node;
        let rename = symb.thedef.bbRename;
        if (rename !== undefined || symb.thedef.bbAlwaysClone) {
            symb = symb.clone();
            if (rename !== undefined) {
                symb.name = rename;
            }
            symb.thedef = undefined;
            symb.scope = undefined;
        }
        return symb;
    }
    return node;
}
function globalDefines(defines) {
    let res = "";
    if (defines == null)
        return res;
    let dns = Object.keys(defines);
    for (let i = 0; i < dns.length; i++) {
        res += "var " + dns[i] + " = " + JSON.stringify(defines[dns[i]]) + ";\n";
    }
    return res;
}
function captureTopLevelVarsFromTslibSource(bundleAst, topLevelNames) {
    bundleAst.figure_out_scope();
    bundleAst
        .body[0].body.expression.variables.each((val, key) => {
        if (key[0] == "_")
            topLevelNames[key] = true;
    });
}
function bundle(project) {
    let order = [];
    let visited = [];
    let pureFuncs = Object.create(null);
    let cache = Object.create(null);
    project.mainFiles.forEach(val => {
        const lowerVal = val.toLowerCase();
        if (visited.indexOf(lowerVal) >= 0)
            return;
        visited.push(lowerVal);
        check(val, order, visited, cache);
    });
    let bundleAst = parse('(function(){"use strict";\n' + bb.tslibSource() + "})()");
    let bodyAst = bundleAst
        .body[0].body.expression.body;
    let topLevelNames = Object.create(null);
    captureTopLevelVarsFromTslibSource(bundleAst, topLevelNames);
    let wasSomeDifficult = false;
    order.forEach(f => {
        if (f.difficult) {
            if (!wasSomeDifficult) {
                let ast = parse("var __bbe={};");
                bodyAst.push(...ast.body);
                wasSomeDifficult = true;
            }
            bodyAst.push(...f.ast.body);
            return;
        }
        let suffix = f.name;
        if (suffix.lastIndexOf("/") >= 0)
            suffix = suffix.substr(suffix.lastIndexOf("/") + 1);
        if (suffix.indexOf(".") >= 0)
            suffix = suffix.substr(0, suffix.indexOf("."));
        suffix = suffix.replace(/-/g, "_");
        let walker = new TreeWalker((node, descend) => {
            if (node instanceof AST_Scope) {
                node.variables.each((symb, name) => {
                    if (symb.bbRequirePath)
                        return;
                    let newname = symb.bbRename || name;
                    if (topLevelNames[name] !== undefined &&
                        name !== "__extends" &&
                        (node === f.ast ||
                            node.enclosed.some(enclSymb => topLevelNames[enclSymb.name] !==
                                undefined))) {
                        let index = 0;
                        do {
                            index++;
                            newname = name + "_" + suffix;
                            if (index > 1)
                                newname += "" + index;
                        } while (topLevelNames[newname] !== undefined);
                        symb.bbRename = newname;
                    }
                    else {
                        symb.bbRename = undefined;
                    }
                    if (node === f.ast) {
                        if (name in f.pureFuncs)
                            pureFuncs[newname] = true;
                        topLevelNames[newname] = true;
                    }
                });
            }
            return false;
        });
        f.ast.walk(walker);
    });
    order.forEach(f => {
        if (f.difficult)
            return;
        let transformer = new TreeTransformer((node) => {
            if (node instanceof AST_Label) {
                return node;
            }
            if (node instanceof AST_Symbol) {
                let symb = node;
                if (symb.thedef == null)
                    return undefined;
                let rename = symb.thedef.bbRename;
                if (rename !== undefined ||
                    symb.thedef.bbAlwaysClone) {
                    symb = symb.clone();
                    if (rename !== undefined)
                        symb.name = rename;
                    symb.thedef = undefined;
                    symb.scope = undefined;
                    return symb;
                }
                let reqPath = symb.thedef.bbRequirePath;
                if (reqPath !== undefined &&
                    !(transformer.parent() instanceof AST_PropAccess)) {
                    let p = transformer.parent();
                    if (p instanceof AST_VarDef &&
                        p.name === symb)
                        return undefined;
                    let properties = [];
                    let extf = cache[reqPath.toLowerCase()];
                    if (!extf.difficult) {
                        let keys = Object.keys(extf.exports);
                        keys.forEach(key => {
                            properties.push(new AST_ObjectKeyVal({
                                quote: "'",
                                key,
                                value: renameSymbol(extf.exports[key])
                            }));
                        });
                        return new AST_Object({ properties });
                    }
                }
            }
            if (node instanceof AST_PropAccess) {
                let propAccess = node;
                if (isExports(propAccess.expression)) {
                    let key = matchPropKey(propAccess);
                    if (key) {
                        let symb = f.exports[key];
                        if (symb)
                            return renameSymbol(symb);
                    }
                }
            }
            return undefined;
        }, (node) => {
            if (node instanceof AST_Block) {
                let block = node;
                block.body = block.body.filter(stm => {
                    if (stm instanceof AST_Var) {
                        let varn = stm;
                        if (varn.definitions.length === 0)
                            return false;
                    }
                    else if (stm instanceof AST_SimpleStatement) {
                        let stmbody = stm
                            .body;
                        if (constParamOfCallRequire(stmbody) != null)
                            return false;
                    }
                    return true;
                });
            }
            if (node instanceof AST_Toplevel) {
                let topLevel = node;
                bodyAst.push(...topLevel.body);
            }
            else if (node instanceof AST_Var) {
                let varn = node;
                varn.definitions = varn.definitions.filter(vd => {
                    return vd.name != null;
                });
            }
            else if (node instanceof AST_VarDef) {
                let vardef = node;
                let thedef = vardef.name.thedef;
                if (thedef && thedef.bbRequirePath) {
                    let extf = cache[thedef.bbRequirePath.toLowerCase()];
                    if (extf.difficult) {
                        vardef.value = parse(`__bbe['${thedef.bbRequirePath}']`).body[0].body;
                    }
                    else {
                        vardef.value = undefined;
                        vardef.name = undefined;
                    }
                }
            }
            else if (node instanceof AST_PropAccess) {
                let propAccess = node;
                if (propAccess.expression instanceof AST_SymbolRef) {
                    let symb = propAccess.expression;
                    let thedef = symb.thedef;
                    if (thedef && thedef.bbRequirePath) {
                        let extf = cache[thedef.bbRequirePath.toLowerCase()];
                        if (!extf.difficult) {
                            let extn = matchPropKey(propAccess);
                            if (extn) {
                                let asts = extf.exports[extn];
                                if (asts) {
                                    return renameSymbol(asts);
                                }
                                throw new Error("In " +
                                    thedef.bbRequirePath +
                                    " cannot find " +
                                    extn);
                            }
                        }
                    }
                }
            }
            return undefined;
        });
        f.ast.transform(transformer);
    });
    if (project.compress !== false) {
        bundleAst.figure_out_scope();
        let compressor = Compressor({
            hoist_funs: false,
            warnings: false,
            unsafe: true,
            global_defs: project.defines,
            pure_funcs: call => {
                if (call.expression instanceof AST_SymbolRef) {
                    let symb = call.expression;
                    if (symb.thedef.scope.parent_scope != undefined &&
                        symb.thedef.scope.parent_scope.parent_scope == null) {
                        if (symb.name in pureFuncs)
                            return false;
                    }
                    return true;
                }
                return true;
            }
        });
        bundleAst = bundleAst.transform(compressor);
        // in future to make another pass with removing function calls with empty body
    }
    if (project.mangle !== false) {
        bundleAst.figure_out_scope();
        let rootScope = undefined;
        let walker = new TreeWalker(n => {
            if (n !== bundleAst && n instanceof AST_Scope) {
                rootScope = n;
                return true;
            }
            return false;
        });
        bundleAst.walk(walker);
        rootScope.uses_eval = false;
        rootScope.uses_with = false;
        base54.reset();
        bundleAst.compute_char_frequency();
        bundleAst.mangle_names();
    }
    let os = OutputStream({
        beautify: project.beautify === true
    });
    bundleAst.print(os);
    let out = os.toString();
    if (project.compress === false) {
        out = globalDefines(project.defines) + out;
    }
    bb.writeBundle(out);
}
function bbBundle(params) {
    bundle(JSON.parse(params));
}
