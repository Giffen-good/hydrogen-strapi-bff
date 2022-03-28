import React from 'react';
import {Components} from './componentImports';
import TransitionElement from '../StrapiWrappers/TransitionElement.client';
import StrapiBackgroundColor from '../StrapiWrappers/StrapiBackgroundColor';
import {Suspense} from 'react';
export default function StrapiDynamicZone({mainContent}) {
  console.log('STRAPI DYNAMIC ZONE')
  if (mainContent && mainContent.length) {
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
    component.componentProps?.animation && component.componentProps.animation.length !== 0
  ) {
    console.log(component.componentProps?.transition)
    return (
      <Suspense fallback={null}>
       
          <ApplyBackgroundWrap component={component}>
            <TransitionElement
            settings={component.componentProps.animation}
            classes={component.formattedComponentName}
            >
              <CreateComponent component={component} />
            </TransitionElement>
          </ApplyBackgroundWrap>
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={null}>
        <ApplyBackgroundWrap component={component}>
          <CreateComponent component={component} />
        </ApplyBackgroundWrap>
      </Suspense>
    );
  }
}

const ApplyBackgroundWrap = ({component,children}) => {
  if (component.componentProps?.bg_color) {
    return (
      <StrapiBackgroundColor
        classes={component.formattedComponentName}
        font_color={component.componentProps?.bg_color.font_color}
        bg_color={component.componentProps?.bg_color.background_color_component}
      >
        {children}
      </StrapiBackgroundColor>
    );
  } else {
    return <div>{children}</div>
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
        `WARNING: ${c.formattedComponentName} does not have an associated template file. Props include: \n ${c.componentProps} `,
      );
      console.log(c);
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
