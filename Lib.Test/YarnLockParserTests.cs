using System.Linq;
using Lib.DiskCache;
using Lib.Registry;
using Xunit;

namespace Lib.Test
{
    public class YarnLockParserTests
    {
        [Fact]
        public void MoreComplexYarnLock()
        {
            var source = @"# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1


""@types/node@^10.10.3"":
  version ""10.10.3""
  resolved ""https://registry.yarnpkg.com/@types/node/-/node-10.10.3.tgz#09c75a4ad84d6a3d286790bdd9489a4f8ee9906c""

bobril@*, bobril@^8.15.0:
  version ""8.15.0""
  resolved ""https://registry.yarnpkg.com/bobril/-/bobril-8.15.0.tgz#6b2a2778f6da1e40fc76a9ede2ed5fd63a0f1380""

bobx@*:
  version ""0.19.0""
  resolved ""https://registry.yarnpkg.com/bobx/-/bobx-0.19.0.tgz#448c8436bd3b669a2eb789a56338d6a52dd344b4""
  dependencies:
    bobril ""*""

typescript@^3.0.3:
  version ""3.0.3""
  resolved ""https://registry.yarnpkg.com/typescript/-/typescript-3.0.3.tgz#4853b3e275ecdaa27f78fda46dc273a7eb7fc1c8""
";
            var fs = new FakeFsAbstraction();
            fs.AddTextFile("proj/package.json", "");
            var dc = new DiskCache.DiskCache(fs, () => fs);
            var directory = dc.TryGetItem("proj") as IDirectoryCache;
            var result = YarnNodePackageManager.ParseYarnLock(directory, source).ToArray();
            Assert.Equal(4, result.Length);
            Assert.Equal("@types/node", result[0].Name);
            Assert.Equal("10.10.3", result[0].Version);
            Assert.Equal(directory.FullPath + "/node_modules/@types/node", result[0].Path);
            Assert.Equal("bobril", result[1].Name);
            Assert.Equal("8.15.0", result[1].Version);
            Assert.Equal(directory.FullPath + "/node_modules/bobril", result[1].Path);
            Assert.Equal("bobx", result[2].Name);
            Assert.Equal("0.19.0", result[2].Version);
            Assert.Equal(directory.FullPath + "/node_modules/bobx", result[2].Path);
            Assert.Equal("typescript", result[3].Name);
            Assert.Equal("3.0.3", result[3].Version);
            Assert.Equal(directory.FullPath + "/node_modules/typescript", result[3].Path);
        }
    }
}