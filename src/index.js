const FRAGMENT = 'Fragment';

export default function({ types: t }, options = {}) {
  const { moduleName = 'rax' } = options;
  let rootPath;
  let added = false;
  return {
    visitor: {
      Program(path) {
        rootPath = path;
      },
      JSXIdentifier(path) {
        const { node } = path;
        if (node.name === FRAGMENT) {
          if (!added) {
            addImportStatement(rootPath, moduleName, t);
            added = true;
          }
          path.stop();
        }
      }
    }
  };
}

function addImportStatement(path, moduleName, t) {
  const { node } = path;
  const id = t.identifier(FRAGMENT);
  const importDeclaration = t.importDeclaration([
    t.importSpecifier(id, id)
  ], t.stringLiteral(moduleName))
  node.body.unshift(importDeclaration);
}
