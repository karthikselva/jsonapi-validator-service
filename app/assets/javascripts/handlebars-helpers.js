//=require handlebars
Handlebars.registerHelper('list', function(items, options) {
  if(items == null || items == undefined)
    return '';
  
  var out = "";

  for(var i=0, l=items.length; i<l; i++) {
    out = out +options.fn(items[i]);
  }

  return out;
});

Handlebars.registerHelper('if', function(conditional, options) {
  if(conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});