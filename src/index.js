const FRAGMENT = 'Fragment';

export default function({ types: t }, options = {}) {
  const { moduleName = 'rax' } = options;
  return {
    visitor: {
      Program(path) {
        path.__jsxfragment = false;
      },
      JSXIdentifier(path) {
        const rootPath = path.findParent(p => p.isProgram());
        const { node } = path;
        if (node.name === FRAGMENT) {
          if (rootPath.__jsxfragment === false) {
            addImportStatement(rootPath, moduleName, t);
            rootPath.__jsxfragment = true;
          }
          path.stop();
        }
      }
    }
  };
}

function addImportStatement(rootPath, moduleName, t) {
  const id = t.identifier(FRAGMENT);
  const importDeclaration = t.importDeclaration([
    t.importSpecifier(id, id)
  ], t.stringLiteral(moduleName))
  rootPath.unshiftContainer('body', importDeclaration);
}
