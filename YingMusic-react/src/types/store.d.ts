type RootType = ReturnType<typeof import('@/store').getState>;
interface Window {
	__REDUX_DEVTOOLS_EXTENSION__: function;
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: function;
}

interface LooseObject {
	[key: string]: any;
}
