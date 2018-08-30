import { RoutingSettings, DefinedRoutingSettings } from './types/routes';

function isDefined(prop: any): boolean {
    return !(prop === null || prop === undefined);
}

export default function getValidSettings(settings: RoutingSettings, firstRoute: string): DefinedRoutingSettings {
    const newSettings: DefinedRoutingSettings = {
        initialRoute: firstRoute,
        swipeNavigation: true,
        footer: undefined,
        header: undefined
    };
    if(isDefined(settings)) {
        // @ts-ignore
        if(isDefined(settings.initialRoute)) {  
            // @ts-ignore
            newSettings.initialRoute = settings.initialRoute as any;
        }
        // @ts-ignore
        if(isDefined(settings.header)) {
            // @ts-ignore
            newSettings.header = settings.header as any;
        }
        // @ts-ignore
        if(isDefined(settings.footer)) {
            // @ts-ignore
            newSettings.footer = settings.footer as any;
        }
        // @ts-ignore
        if(isDefined(settings.swipeNavigation)) {
            // @ts-ignore
            newSettings.swipeNavigation = settings.swipeNavigation as any;
        }
    }

    return newSettings;
}