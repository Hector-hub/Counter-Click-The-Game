import React from 'react';

const TiempoInicial = React.createContext(0);
export const  ProviderTiempo=TiempoInicial.Provider;
export const  ConsumerTiempo=TiempoInicial.Consumer;

export default TiempoInicial;