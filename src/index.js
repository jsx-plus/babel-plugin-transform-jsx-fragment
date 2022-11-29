const FRAGMENT = 'Fragment';

export default function({ types: t }, options = {}) {
  const { moduleName = 'rax', ignoreModuleCheck = false, } = options;
  return {
    visitor: {
      Program(path) {
        path.__jsxfragment = false;
      },
      ImportDeclaration(path) {
        const { node } = path;
        const { specifiers, source } = node;
        const rootPath = path.findParent(p => p.isProgram());

        // Check if `Fragment` is already imported.
        if ((ignoreModuleCheck || (source && source.value === moduleName)) && specifiers) {
          specifiers.some(function(s) {
            if (s.local.name === FRAGMENT) {
              rootPath.__jsxfragment = true;
              return true;
            }
          });
        }
      },
      // jsx short syntax <>...</>
      JSXFragment: function(path) {
        const rootPath = path.findParent(p => p.isProgram());
        
        if (rootPath.__jsxfragment === false) {
          addImportStatement(rootPath, moduleName, t);
          rootPath.__jsxfragment = true;
        }
      },
      // <Fragment>...</Fragment>
      JSXOpeningElement(path) {
        const rootPath = path.findParent(p => p.isProgram());
        const { node } = path;
        
        if (t.isJSXIdentifier(node.name, { name: FRAGMENT })) {
          if (rootPath.__jsxfragment === false) {
            addImportStatement(rootPath, moduleName, t);
            rootPath.__jsxfragment = true;
          }
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
