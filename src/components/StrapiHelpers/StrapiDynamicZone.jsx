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
  if (component.componentProps?.component_settings && component.componentProps.component_settings.hide_section) return 
  if (
    component.componentProps?.component_settings && component.componentProps.component_settings.animation
  ) {
    const a = component.componentProps.component_settings;
    const settings = {transition: a.animation, threshold: a.animation_threshold, trigger_once: a.trigger_animation_once, duration: a.animation_duration, anchor_link: a.anchor_link}
    return (
      <Suspense fallback={null}>
       
          <ApplyBackgroundWrap component={component}>
            <TransitionElement
            settings={settings}
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
  if (component.componentProps?.component_settings) {
    const a = component.componentProps.component_settings;
    console.log(a)
    return (
      <StrapiBackgroundColor
        classes={component.formattedComponentName}
        font_color={a.component_font_color}
        bg_color={a.component_bg_color}
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
