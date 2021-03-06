﻿using Njsast.Output;
using Njsast.Reader;
using Njsast.Scope;

namespace Njsast.Ast
{
    /// A function expression
    public class AstFunction : AstLambda
    {
        public AstFunction(Parser parser, Position startPos, Position endPos, AstSymbolDeclaration? name,
            ref StructList<AstNode> argNames, bool isGenerator, bool async, ref StructList<AstNode> body) : base(parser,
            startPos, endPos, name, ref argNames, isGenerator, async, ref body)
        {
        }

        public AstFunction()
        {
        }

        public override bool NeedParens(OutputContext output)
        {
            if (output.FirstInStatement())
            {
                return true;
            }

            if (output.Options.Webkit)
            {
                var p = output.Parent();
                if (p is AstPropAccess propAccess && propAccess.Expression == this)
                {
                    return true;
                }
            }

            if (output.Options.WrapIife)
            {
                var p = output.Parent();
                return p is AstCall call && call.Expression == this;
            }

            return false;
        }

        public override string NextMangled(ScopeOptions options, SymbolDef symbolDef)
        {
            // in Safari strict mode, something like (function x(x){...}) is a syntax error;
            // a function expression's argument cannot shadow the function expression's name

            var trickyDef = symbolDef.Orig[0] is AstSymbolFunarg && Name != null ? Name.Thedef : null;

            // the function's MangledName is null when KeepFucntionNames is true
            var trickyName = trickyDef != null ? (trickyDef.MangledName ?? trickyDef.Name) : null;

            while (true)
            {
                var name = base.NextMangled(options, symbolDef);
                if (trickyName != name)
                    return name;
            }
        }
    }
}
