(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{67:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return u}));var r=n(2),a=(n(0),n(72));const i={id:"installing",title:"Installation",sidebar_label:"Installation"},o={unversionedId:"installing",id:"installing",isDocsHomePage:!1,title:"Installation",description:"Requirements",source:"@site/docs/docs-installing.mdx",permalink:"/react-native-navigation-hooks/docs/installing",editUrl:"https://github.com/underscopeio/react-native-navigation-hooks/edit/master/website/docs/docs-installing.mdx",sidebar_label:"Installation",sidebar:"docs",previous:{title:"Before you start",permalink:"/react-native-navigation-hooks/docs/before-you-start"},next:{title:"Migration Guide",permalink:"/react-native-navigation-hooks/docs/migration-guide"}},c=[{value:"Requirements",id:"requirements",children:[]},{value:"npm or yarn",id:"npm-or-yarn",children:[]},{value:"Supported versions",id:"supported-versions",children:[]}],l={rightToc:c};function u({components:e,...t}){return Object(a.b)("wrapper",Object(r.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"requirements"},"Requirements"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"node >= 8"),Object(a.b)("li",{parentName:"ul"},"react-native >= 0.51"),Object(a.b)("li",{parentName:"ul"},'react-native-navigation ">=2.21.0"')),Object(a.b)("h2",{id:"npm-or-yarn"},"npm or yarn"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"npm install --save react-native-navigation-hooks"))),Object(a.b)("p",null,"...or if you use ",Object(a.b)("inlineCode",{parentName:"p"},"yarn"),":"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"yarn add react-native-navigation-hooks"))),Object(a.b)("h2",{id:"supported-versions"},"Supported versions"),Object(a.b)("table",null,Object(a.b)("tr",null,Object(a.b)("td",null,"RN Navigation"),Object(a.b)("td",{align:"center"},">= 2.21.0"),Object(a.b)("td",{align:"center"},">= 4.0.7"),Object(a.b)("td",{align:"center"},">= 4.5.0"),Object(a.b)("td",{align:"center"},">= 6.5.0")),Object(a.b)("tr",null,Object(a.b)("td",null,"RN Navigation Hooks"),Object(a.b)("td",{align:"center"},"<= 3.x.x"),Object(a.b)("td",{align:"center"}," 4.x.x"),Object(a.b)("td",{align:"center"}," 5.x.x"),Object(a.b)("td",{align:"center"}," 6.x.x"))))}u.isMDXComponent=!0},72:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=a.a.createContext({}),b=function(e){var t=a.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=b(e.components);return a.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=b(n),d=r,m=s["".concat(o,".").concat(d)]||s[d]||p[d]||i;return n?a.a.createElement(m,c(c({ref:t},u),{},{components:n})):a.a.createElement(m,c({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var u=2;u<i;u++)o[u]=n[u];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);