import {each, hasIn} from 'lodash-es';
import React, {Suspense, Fragment} from 'react';
import {Components} from './StrapiDynamicComponents/componentImports';
export default function StrapiDynamicZone({data}) {
  const mainContent = data.attributes.main_content;
  const formattedComponents = getDynamicComponents(mainContent, Components);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {formattedComponents.map((c, idx) => {
          return CustomComponent(c, idx);
        })}
      </Suspense>
    </>
  );
}

function mapComponentNames(d) {
  let formattedComponents = [];
  each(d, function (item) {
    const formattedComponentObj = {
      componentProps: item,
      formattedComponentName: '',
    };
    const pSplit = item.__component.split('.');
    let f = '';
    each(pSplit[1].split('-'), function (s) {
      const c = titleCase(s);
      f += c;
    });
    formattedComponentObj.formattedComponentName = f;
    formattedComponents.push(formattedComponentObj);
  });
  return formattedComponents;
}
function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
function getDynamicComponents(mainContent, importedComponents) {
  const formattedComponents = mapComponentNames(mainContent);
  let availableComponents = [];
  each(formattedComponents, function (c) {
    if (hasIn(importedComponents, c.formattedComponentName)) {
      c.JsxComponent = importedComponents[c.formattedComponentName];
      availableComponents.push(c);
    } else {
      console.warn(
        `WARNING: ${c.formattedComponentName} does not have an associated template file `,
      );
    }
  });
  return availableComponents;
}

function CustomComponent(component, idx) {
  if (typeof component.JsxComponent !== 'undefined') {
    return React.createElement(component.JsxComponent, {
      ...component.componentProps,
    });
  }

  console.warn(`Error Creating Custom Component: ${component.name}`);
  return React.createElement(
    () => <div>The component {component.name} has not been created yet.</div>,
    {key: idx},
  );
}
