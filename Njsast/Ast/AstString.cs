﻿using Njsast.AstDump;
using Njsast.ConstEval;
using Njsast.Output;
using Njsast.Reader;

namespace Njsast.Ast
{
    /// A string literal
    public class AstString : AstConstant
    {
        /// [string] the contents of this string
        public readonly string Value;

        public AstString(Parser parser, Position startLoc, Position endLoc, string value) : base(parser, startLoc, endLoc)
        {
            Value = value;
        }

        public AstString(string value)
        {
            Value = value;
        }

        public override void DumpScalars(IAstDumpWriter writer)
        {
            base.DumpScalars(writer);
            writer.PrintProp("Value", Value);
        }

        public override void CodeGen(OutputContext output)
        {
            output.PrintString(Value);
        }

        public override object? ConstValue(IConstEvalCtx? ctx = null)
        {
            if (ctx != null) return ctx.ConstStringResolver(Value);
            return Value;
        }
    }
}
