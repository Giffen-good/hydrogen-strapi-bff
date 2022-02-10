import React from 'react';
import {Components} from './StrapiDynamicComponents/componentImports';
import TransitionElement from './StrapiWrappers/TransitionElement.client';
import StrapiBackgroundColor from './StrapiWrappers/StrapiBackgroundColor';
import {Suspense} from 'react';
export default function StrapiDynamicZone({data}) {
  if (!data) return;
  const mainContent = data.attributes.main_content;
  if (mainContent.length) {
    const formattedComponents = getDynamicComponents(mainContent, Components);
    return (
      <>
        {formattedComponents.map((c, idx) => {
          return <DynamicStrapiComponent component={c} key={idx} />;
        })}
      </>
    );
  } else {
    return;
  }
}
function DynamicStrapiComponent({component}) {
  if (
    component.componentProps?.transition &&
    component.componentProps.transition.transition !== 'none'
  ) {
    return (
      <Suspense fallback={null}>
        <TransitionElement settings={component.componentProps.transition}>
          <ApplyBackgroundWrap component={component} />
        </TransitionElement>
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={null}>
        <ApplyBackgroundWrap component={component} />
      </Suspense>
    );
  }
}
const ApplyTransitionWrap = ({component, children}) => {
  if (
    component.componentProps?.transition &&
    component.componentProps.transition.transition !== 'none'
  ) {
    return (
      <TransitionElement settings={component.componentProps.transition}>
        {children}
      </TransitionElement>
    );
  } else {
    return null;
  }
};
const ApplyBackgroundWrap = ({component}) => {
  if (component.componentProps?.bg_color) {
    return (
      <StrapiBackgroundColor
        color={component.componentProps?.bg_color.background_color_component}
      >
        <CreateComponent component={component} />
      </StrapiBackgroundColor>
    );
  } else {
    return <CreateComponent component={component} />;
  }
};
function mapComponentNames(d) {
  let formattedComponents = [];
  d.map((item) => {
    const formattedComponentObj = {
      componentProps: item,
      formattedComponentName: '',
    };
    const pSplit = item.__component.split('.');
    let f = '';
    pSplit[1].split('-').map((s) => {
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
  formattedComponents.map((c) => {
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

function CreateComponent({component}) {
  if (typeof component.JsxComponent !== 'undefined') {
    return React.createElement(component.JsxComponent, {
      ...component.componentProps,
    });
  }

  console.warn(`Error Creating Custom Component: ${component.name}`);
  return;
}
function hasIn(object, key) {
  return object != null && key in Object(object);
}
