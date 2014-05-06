function createXPathFromElement(elm) { 
  var allNodes = document.getElementsByTagName('*'); 
  var segs = []
  for (; elm && elm.nodeType == 1; elm = elm.parentNode) 
  { 
    if (elm.hasAttribute('id')) { 
      var uniqueIdCount = 0; 
      for (var n=0;n < allNodes.length;n++) { 
        if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
        if (uniqueIdCount > 1) break; 
      }; 
      if ( uniqueIdCount == 1) { 
        segs.unshift('id("' + elm.getAttribute('id') + '")'); 
        return segs.join('/'); 
      } else { 
        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
      } 
    } 
    else if (elm.hasAttribute('class')) { 
      for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
        if (sib.className == elm.getAttribute('class'))  i++;  // counting number of same class
      }; 
      // also adding in index for good measure
      // TODO this will probably not be always right because lack of parenthesis
      if (elm.getAttribute('class'))
        segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]' + '[' + i + ']'); 
      else
        segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
    } 
    else { 
      for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
        if (sib.localName == elm.localName)  i++; 
      }; 
      segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
    }; 
  }; 
  return segs.length ? '/' + segs.join('/') : null; 
};
