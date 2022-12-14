import React, { useContext } from 'react';

const RouteContext = React.createContext(null);

export function useRoutesContext() {
    return useContext(RouteContext);
}

export function RouteProvider({children, routes, addNewRoute, updateRoute, deleteRoute}) {
    return (
        <RouteContext.Provider 
         value={{
               routes,
               addNewRoute,
               updateRoute,
               deleteRoute
         }}>
            {children}
        </RouteContext.Provider>
    );
}