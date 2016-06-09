//=require handlebars
Handlebars.registerHelper('list', function(items, options) {
  var out = "";

  for(var i=0, l=items.length; i<l; i++) {
    out = out +options.fn(items[i]);
  }

  return out;
});