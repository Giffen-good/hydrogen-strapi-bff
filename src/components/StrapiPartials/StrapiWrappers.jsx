import React, {Suspense} from "react";
import TransitionElement from "../StrapiWrappers/TransitionElement.client";
import StrapiBackgroundColor from "../StrapiWrappers/StrapiBackgroundColor";

export default function StrapiWrappers ({
  componentProps,
  componentName,
  children,
}) {
    if (componentProps.component_settings && componentProps.component_settings.hide_section) return
    if (
        componentProps?.component_settings && componentProps.component_settings.animation
    ) {
        const a = componentProps.component_settings;
        const settings = {transition: a.animation, threshold: a.animation_threshold, trigger_once: a.trigger_animation_once, duration: a.animation_duration, anchor_link: a.anchor_link}
        return (
            <Suspense fallback={null}>

                <ApplyBackgroundWrap componentProps={componentProps} componentName={componentName}>
                    <TransitionElement
                        settings={settings}
                        classes={componentName}
                    >
                        {children}
                    </TransitionElement>
                </ApplyBackgroundWrap>
            </Suspense>
        );
    } else {
        return (
            <Suspense fallback={null}>
                <ApplyBackgroundWrap >
                    {children}
                </ApplyBackgroundWrap>
            </Suspense>
        );
    }
}

const ApplyBackgroundWrap = ({componentProps, componentName, children}) => {
    if (componentProps?.component_settings) {
        const a = componentProps.component_settings;
        return (
            <StrapiBackgroundColor
                classes={componentName}
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