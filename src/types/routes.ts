import React from 'react';

export interface Route {
    routeName: string;
    routeComponent: typeof React.Component;
}

export interface RoutingSettings {
    header?: typeof React.Component;
    initialRoute?: string;
    swipeNavigation?: boolean;
    footer?: typeof React.Component;
}

export interface DefinedRoutingSettings {
    header?: typeof React.Component;
    footer?: typeof React.Component;
    initialRoute: string;
    swipeNavigation: boolean;
}