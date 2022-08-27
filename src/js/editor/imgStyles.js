wp.domReady(() => {
  wp.blocks.registerBlockStyle('core/image', {
    name: 'float-left',
    label: 'Float Left',
  });

  wp.blocks.registerBlockStyle('core/image', {
    name: 'float-right',
    label: 'Float Right',
  });
});
