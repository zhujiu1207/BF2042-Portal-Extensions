"use strict";class se{constructor(n,o,t){this.initData=n,this.baseUrl=o,this.manifest=t}initializeWorkspace(){}getUrl(n){return`${this.baseUrl}/${n}`}getMouseCoords(){return this.initData.api.getMouseCoords()}getSelectedBlocks(n){return this.initData.api.getSelectedBlocks(n)}showContextMenuWithBack(n){return this.initData.api.showContextMenuWithBack(n)}registerMenu(n){return this.initData.api.registerMenu(n)}registerItem(n){return this.initData.api.registerItem(n)}createMenu(n,o,t){return this.initData.api.createMenu(n,o,t)}getExtensionVersion(){return this.initData.version}}const $=new Map;let J;function le(e){J=e,e.pluginManager&&ce(e.pluginManager)}function ce(e){q({baseUrl:e.baseUrl,manifest:{id:"添加扩展模块",loadAsModule:e.loadAsModule||!1,main:e.main}})}function q(e){var n;try{const o=new se(J,e.baseUrl,e.manifest);$.set(e.manifest.id,o);const t=document.createElement("script");t.setAttribute("type",e.manifest.loadAsModule?"module":"text/javascript"),t.setAttribute("src",o.getUrl(e.manifest.main)),t.addEventListener("load",function(){o.initializeWorkspace()}),document.body.appendChild(t)}catch(o){BF2042Portal.Shared.logError(`Failed to load plugin '${((n=e.manifest)==null?void 0:n.name)||e.manifest.id}''`,o)}}function ue(){for(const e of $.values())e.initializeWorkspace()}function pe(e){const n=$.get(e);if(!n)throw`Plugin with id ${e} not found!`;return n}const de={initializeWorkspace:ue,getPlugin:pe,loadPlugin:q};function ge(e,n){const o={};return o.Events=e.Events,o.getMainWorkspace=function(){return e.getMainWorkspace()},o.getTranslation=function(t){const i=t.split(".");let r=n.Msg.Msg[i[0]];for(let s=1;s<i.length;s++)r=r[i[s]];return r},o.Blocks={getSelected:function(){return e.getSelected()},getAllClasses:function(){return Object.keys(e.Blocks).map(t=>({key:t,value:e.Blocks[t]}))},getAllInstances:function(){return o.getMainWorkspace().getAllBlocks(!1).map(t=>({key:t.id,value:t}))}},o.ContextMenu={ScopeType:{BLOCK:e.ContextMenuRegistry.ScopeType.BLOCK,WORKSPACE:e.ContextMenuRegistry.ScopeType.WORKSPACE},show:function(t,i,r){e.ContextMenu.show(t,i,r)},getOptionsForWorkspace:function(t){return e.ContextMenuRegistry.registry.getContextMenuOptions(o.ContextMenu.ScopeType.WORKSPACE,{workspace:t})},getOptionsForBlock:function(t){return e.ContextMenuRegistry.registry.getContextMenuOptions(o.ContextMenu.ScopeType.BLOCK,{block:t})},getAllItems:function(){return[...e.ContextMenuRegistry.registry.registry_].map(t=>({key:t[0],value:t[1]}))},unregisterItem:function(t){e.ContextMenuRegistry.registry.unregister(t)},registerItem:function(t){e.ContextMenuRegistry.registry.register(t)}},o.Xml={createElement:e.utils.xml.createElement,mouseToSvg:e.browserEvents.mouseToSvg,workspaceToDom:e.Xml.workspaceToDom,textToDom:e.Xml.textToDom,domToWorkspace:e.Xml.domToWorkspace,domToVariables:e.Xml.domToVariables,domToText:e.Xml.domToText,blockToXml:function(t){const i=e.Xml.blockToDomWithXY(t,!0);return e.Xml.deleteNext(i),e.Xml.domToText(i).replace('xmlns="https://developers.google.com/blockly/xml"',"")}},o}const a=ge(_Blockly,Blockly),F={menus:{},items:{}},E={x:0,y:0},W=[];let N;const b=[],U=[],M=[];let K=!1;const P=new Map;function me(){const e="Failed to copy to clipboard!";function n(){return"enabled"}async function o(t){try{const i=k(t),r=Z(i);if(!r){alert(e);return}await BF2042Portal.Shared.copyTextToClipboard(r)}catch(i){BF2042Portal.Shared.logError(e,i),alert(e)}}return{id:"copyToClipboard",displayText:"复制到剪贴板",scopeType:a.ContextMenu.ScopeType.BLOCK,weight:100,preconditionFn:n,callback:o}}function fe(){const e="Failed to paste from clipboard!";function n(){return"enabled"}async function o(){try{const t=await BF2042Portal.Shared.pasteTextFromClipboard();ee(t)||alert(e)}catch(t){BF2042Portal.Shared.logError(e,t),alert(e)}}return{id:"pasteFromClipboard",displayText:"从剪贴板粘贴",scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:n,callback:o}}function ye(){function e(t){const i=t.block.getCommentIcon()?"删除":"添加",r=k(t);return r.length===1?`${i}注释`:`${i}注释(${r.length}个模块)`}function n(){return"enabled"}function o(t){const i=t.block.getCommentIcon()?null:"",r=k(t);for(let s=0;s<r.length;s++)r[s].setCommentText(i)}return{id:"toggleComments",displayText:e,scopeType:a.ContextMenu.ScopeType.BLOCK,weight:100,preconditionFn:n,callback:o}}function he(){function e(t){const i=t.block.getInputsInline()?"垂直":"水平",r=k(t);return r.length===1?`显示模块方向${i}`:`显示模块方向${i}(${r.length}个模块)`}function n(){return"enabled"}function o(t){const i=!t.block.getInputsInline(),r=k(t);for(let s=0;s<r.length;s++)r[s].setInputsInline(i)}return{id:"toggleInputs",displayText:e,scopeType:a.ContextMenu.ScopeType.BLOCK,weight:100,preconditionFn:n,callback:o}}function ke(){function e(t){const i=t.block.isCollapsed()?"恢复正常":"选中模块",r=k(t);return r.length===1?`${i}最小化`:`${i}${r.length}个最小化`}function n(){return"enabled"}function o(t){const i=!t.block.isCollapsed(),r=k(t);for(let s=0;s<r.length;s++)r[s].setCollapsed(i)}return{id:"toggleCollapse",displayText:e,scopeType:a.ContextMenu.ScopeType.BLOCK,weight:100,preconditionFn:n,callback:o}}function xe(){function e(t){const i=k(t);return i?i.length===1?"选中模块最小化":`最小化选中${i.length}个模块`:"所有模块最小化"}function n(){return"enabled"}function o(t){const i=k(t);if(i)for(let r=0;r<i.length;r++)i[r].setCollapsed(!0);else{const r=a.getMainWorkspace();for(const s of r.getAllBlocks(!1))s.setCollapsed(!0)}}return{id:"collapseAllBlocks",displayText:e,scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:n,callback:o}}function be(){function e(t){const i=k(t);return i?i.length===1?"选中模块恢复正常大小":`恢复选中${i.length}个模块的大小`:"所有模块恢复正常大小"}function n(){return"enabled"}function o(t){const i=k(t);if(i)for(let r=0;r<i.length;r++)i[r].setCollapsed(!1);else{const r=a.getMainWorkspace();for(const s of r.getAllBlocks(!1))s.setCollapsed(!1)}}return{id:"expandAllBlocks",displayText:e,scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:n,callback:o}}function Te(){function e(o){return o.block.type==="modBlock"&&a.getMainWorkspace().getBlocksByType("modBlock",!1).length>1?"enabled":"hidden"}function n(o){o.block.dispose(!1,!1)}return{id:"deleteModBlock",displayText:"删除MOD模块",scopeType:a.ContextMenu.ScopeType.BLOCK,weight:100,preconditionFn:e,callback:n}}function Ce(){const e="https://docs.bfportal.gg/blocks";function n(){return"enabled"}function o(){window.open(e,"bf2042_documentation")}return{id:"openDocumentation",displayText:"打开帮助文档",scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:n,callback:o}}function Be(){function e(o){return o.block.type==="subroutineInstanceBlock"?"enabled":"hidden"}function n(o){const t=o.block.getFieldValue("SUBROUTINE_NAME"),i=a.getMainWorkspace().getBlocksByType("subroutineBlock",!1).filter(r=>r.getFieldValue("SUBROUTINE_NAME")===t);i.length>0&&a.getMainWorkspace().centerOnBlock(i[0].id)}return{id:"jumpToSubRoutine",displayText:"定位到子程序位置",scopeType:a.ContextMenu.ScopeType.BLOCK,weight:100,preconditionFn:e,callback:n}}function Se(){function e(){return"enabled"}function n(){document.querySelector("app-root").classList.toggle("distraction-free"),a.getMainWorkspace().resize()}return{id:"toggleDistractionFreeMode",displayText:"打开/关闭编辑器UI显示",scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:e,callback:n}}function Me(){function e(){return"enabled"}function n(){document.querySelector("app-root").classList.toggle("hide-toolbox"),a.getMainWorkspace().resize()}return{id:"toggleToolbox",displayText:"打开/关闭左侧模块列表",scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:e,callback:n}}function Ee(){return H("exportBlocksWorkspace",a.ContextMenu.ScopeType.WORKSPACE)}function we(){return H("exportBlocksBlock",a.ContextMenu.ScopeType.BLOCK)}function H(e,n){function o(){return"enabled"}function t(l){const d=[{text:"XML",enabled:!0,callback:()=>i(l)},{text:"SVG",enabled:!0,callback:()=>r(l)},{text:"PNG",enabled:!0,callback:()=>s(l)}];BF2042Portal.Shared.isCopyBlobToClipboardSupported()&&d.push({text:"PNG (下载到剪贴板)",enabled:!0,callback:()=>f(l)}),L(d)}async function i(l){const d=k(l),p=Z(d);if(!p){alert("Failed to export XML!");return}const C=`data:application/xml;charset=utf-8,${encodeURIComponent(p)}`;y(C,"workspace.xml")}async function r(l){const d=k(l),p=await u(d,!1);y(p.svgDataURL,"screenshot.svg")}async function s(l){try{const d=k(l),p=await u(d,!0),C=await c(p,1,"png");y(C,"screenshot.png")}catch(d){BF2042Portal.Shared.logError("Failed to export PNG (Download)",d),alert("Failed to export PNG (Download)!")}}async function f(l){try{const d=k(l),p=await u(d,!0),C=await c(p,1,"blob");await BF2042Portal.Shared.copyBlobToClipboard(C),alert("Done!")}catch(d){BF2042Portal.Shared.logError("Failed to export PNG (Clipboard)",d),alert("Failed to export PNG (Clipboard)!")}}async function u(l,d){const p=a.getMainWorkspace();let C,v,w,x;if(l&&l.length>0){let m,B,T,A;for(let R=0;R<l.length;R++){const I=l[R],S=I.getRelativeToSurfaceXY();(!m||S.x<m)&&(m=S.x),(!B||S.y<B)&&(B=S.y),(!T||S.x+I.width>T)&&(T=S.x+I.width),(!A||S.y+I.height>A)&&(A=S.y+I.height)}C=m,v=B,w=T-m,x=A-B}else{const m=p.getBlocksBoundingBox();C=m.left,v=m.top,w=m.right-C,x=m.bottom-v}const O=p.getCanvas().cloneNode(!0);O.removeAttribute("transform");const h=document.createElementNS("http://www.w3.org/2000/svg","svg");h.setAttribute("xmlns","http://www.w3.org/2000/svg"),h.appendChild(O),h.setAttribute("viewBox",`${C} ${v} ${w} ${x}`),h.setAttribute("class",`blocklySvg ${p.options.renderer||"geras"}-renderer ${p.getTheme?p.getTheme().name+"-theme":""}`),h.setAttribute("width",w.toString()),h.setAttribute("height",x.toString()),h.setAttribute("style","background-color: transparent");const ne=[].slice.call(document.head.querySelectorAll("style")).filter(function(m){return/\.blocklySvg/.test(m.innerText)||m.id.indexOf("blockly-")===0}).map(function(m){return m.innerText}).join(""),j=document.createElement("style");j.innerHTML=ne,h.insertBefore(j,h.firstChild);let D=new XMLSerializer().serializeToString(h).replace(/&nbsp/g,"&#160");if(d){const m=[...D.matchAll(/xlink:href="(.*?)"/g)];for(const B of m){const T=B[1];if(!(T.startsWith("data:")||P.has(T)))try{const A=await new Promise(async(R,I)=>{try{const re=await(await fetch("https://portal.battlefield.com"+T)).blob(),z=new FileReader;z.onload=ae=>{R(ae.target.result)},z.readAsDataURL(re)}catch{I()}});P.set(T,A)}catch{P.set(T,T)}}}D=D.replace(/xlink:href="(.*?)"/g,function(m,B){return`xlink:href="${P.has(B)?P.get(B):B}"`});const ie=`data:image/svg+xml,${encodeURIComponent(D)}`;return{width:w,height:x,svgDataURL:ie}}async function c(l,d,p){return new Promise((v,w)=>{const x=document.createElement("canvas"),Y=x.getContext("2d"),O=new Image;x.width=l.width*d,x.height=l.height*d,(x.width>16384||x.height>16384)&&w("The resulting image would be too large to handle for your browser. Please select less blocks or reduce the scale."),O.onload=function(){Y.drawImage(O,0,0,l.width,l.height,0,0,x.width,x.height);try{if(p==="png"){const h=x.toDataURL("image/png");v(h)}else if(p==="blob")x.toBlob(function(h){v(h)});else throw"Unknown type"}catch(h){w(`Failed to convert SVG: ${h}`)}},O.src=l.svgDataURL})}function y(l,d){const p=document.createElement("a");p.setAttribute("href",l),p.setAttribute("download",d),p.style.display="none",document.body.appendChild(p),p.click(),document.body.removeChild(p)}return{id:e,displayText:"下载模块文件 >",scopeType:n,weight:100,preconditionFn:o,callback:t}}function ve(){function e(){return"enabled"}function n(){const o=document.createElement("input");o.setAttribute("type","file"),o.setAttribute("accept",".xml,.json"),o.style.display="none",o.addEventListener("change",function(){if(!o.files||o.files.length===0)return;const t=new FileReader;t.onload=function(i){confirm("Do you want to remove all existing blocks before importing?")&&a.getMainWorkspace().clear();try{const r=o.files[0].name.split(".").pop().toLowerCase();if(r==="json"){const s=JSON.parse(i.target.result);Pe(s)||alert("Failed to import workspace from JSON!")}else r==="xml"&&(ee(i.target.result)||alert("Failed to import workspace from XML!"))}catch{alert("Failed to import workspace!")}},t.readAsText(o.files[0])}),document.body.appendChild(o),o.click(),document.body.removeChild(o)}return{id:"importBlocksFromFile",displayText:"导入模块文件",scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:e,callback:n}}function Ae(){function e(){return"enabled"}function n(){const t=[];for(let i=0;i<U.length;i++){const r=U[i];t.push({text:r.displayName,enabled:!0,callback:function(){const s=[];for(let f=0;f<r.contents.length;f++){const u=r.contents[f];let c;switch(u.type){case"mod":c="⚫";break;case"rule":case"controlAction":c="🟣";break;case"condition":c="🔵";break;case"value":case"literal":c="🟢";break;case"action":c="🟡";break;default:c="⚪";break}s.push({text:`${c} ${u.displayName}`,enabled:!0,callback:function(){const y=a.getMainWorkspace().newBlock(u.internalName);y.initSvg(),y.render(),y.moveTo(E)}})}L(s.sort(o))}})}L(t.sort(o))}function o(t,i){return t.text>i.text?1:-1}return{id:"addBlock",displayText:"添加模块 >",scopeType:a.ContextMenu.ScopeType.WORKSPACE,weight:100,preconditionFn:e,callback:n}}function Ie(){return Q("separatorWorkspace",a.ContextMenu.ScopeType.WORKSPACE)}function Ne(){return Q("separatorBlock",a.ContextMenu.ScopeType.BLOCK)}function Q(e,n){return{id:e,displayText:"---",scopeType:n,weight:100,preconditionFn:()=>"disabled",callback:()=>{}}}function Fe(){return V("optionsWorkspace","选项",a.ContextMenu.ScopeType.WORKSPACE)}function Oe(){return V("optionsBlock","选项",a.ContextMenu.ScopeType.BLOCK)}function V(e,n,o){function t(){return"enabled"}function i(r){const s=F.menus[e],f=[];for(let u=0;u<s.options.length;u++){const c=Re(s.options[u],o,r);c&&f.push(c)}L(f)}return{id:e,displayText:`${n} >`,scopeType:o,weight:100,preconditionFn:t,callback:i,options:[]}}function Re(e,n,o){let t;if(e.startsWith("items.")?t=F.items[e.substring(6)]:e.startsWith("menus.")&&(t=F.menus[e.substring(6)]),!(!t||t.scopeType!==n))return{text:typeof t.displayText=="string"?t.displayText:t.displayText(o),enabled:t.preconditionFn(o)==="enabled",callback:()=>t.callback(o)}}function _(e){F.menus[e.id]=e}function g(e){F.items[e.id]=e}function Z(e){const n=a.getMainWorkspace();try{let o="";if(e&&e.length>0){for(let t=0;t<e.length;t++)o+=a.Xml.blockToXml(e[t]);return o}else{const t=a.Xml.workspaceToDom(n,!0),i=t.querySelector("variables");return i&&t.removeChild(i),a.Xml.domToText(t).replace('<xml xmlns="https://developers.google.com/blockly/xml">',"").replace("</xml>","")}}catch(o){BF2042Portal.Shared.logError("Failed to save workspace!",o)}}function Pe(e){const n=a.getMainWorkspace();try{const o=a.Xml.textToDom(e.variables?e.variables:"<xml />");return a.Xml.domToVariables(o,n),a.Xml.domToWorkspace(a.Xml.textToDom(e.mainWorkspace),n),!0}catch(o){BF2042Portal.Shared.logError("Failed to load workspace from JSON!",o)}return!1}function ee(e){try{if(!e||(e=e.trim(),!e.startsWith("<block")))return!1;const n=`<xml xmlns="https://developers.google.com/blockly/xml">${e.trim()}</xml>`,o=a.Xml.textToDom(n),t=o.querySelectorAll("block[type='variableReferenceBlock']"),i=[];t.forEach(u=>{const c=u.querySelector("field[name='OBJECTTYPE']").textContent,y=u.querySelector("field[name='VAR']").textContent;c&&y&&!i.find(l=>l.objectType===c&&l.variableName===y)&&i.push({objectType:c,variableName:y})});const r=document.createElement("variables");i.forEach(u=>{const c=document.createElement("variable");c.setAttribute("type",u.objectType),c.innerText=u.variableName,r.appendChild(c)}),a.Xml.domToVariables(r,a.getMainWorkspace());let s,f;for(let u=0;u<o.childNodes.length;u++){const c=o.childNodes[u],y=parseInt(c.getAttribute("x")),l=parseInt(c.getAttribute("y"));(!s||y<s)&&(s=y),(!f||l<f)&&(f=l)}for(let u=0;u<o.childNodes.length;u++){const c=o.childNodes[u],y=parseInt(c.getAttribute("x")),l=parseInt(c.getAttribute("y"));y===s?c.setAttribute("x",E.x.toString()):c.setAttribute("x",(y-s+E.x).toString()),l===f?c.setAttribute("y",E.y.toString()):c.setAttribute("y",(l-f+E.y).toString())}return a.Xml.domToWorkspace(o,a.getMainWorkspace()),!0}catch(n){BF2042Portal.Shared.logError("Failed to load workspace from XML!",n)}return!1}function X(e){return e.split(" ").map(n=>n.charAt(0).toUpperCase()+n.substring(1).toLowerCase()).join(" ")}function k(e){let n;return M.length>0&&(n=M),!n&&(a.Blocks.getSelected()||e!==void 0&&e.block)&&(n=[a.Blocks.getSelected()||e.block]),n}function We(){return{x:E.x,y:E.y}}function L(e){W.push(N.options),a.ContextMenu.show(N.e,[].concat({text:"< 返回",enabled:!0,callback:()=>{const n=W.splice(W.length-1,1);a.ContextMenu.show(N.e,n[0],N.rtl)}},{text:"---",enabled:!1,callback:()=>{}}).concat(e),N.rtl)}function Le(){De(),Xe(),Ue(),$e(BF2042Portal.Startup.getBlockDefinitions()),Ke(),_e(),le({api:{getSelectedBlocks:k,getMouseCoords:We,showContextMenuWithBack:L,registerMenu:_,registerItem:g,createMenu:V},version:BF2042Portal.Startup.getVersion(),pluginManager:BF2042Portal.Startup.getManifest().pluginManager})}function De(){const e=document.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=`
        /*.blocklyMenu {
            overflow-y: hidden !important;
        }*/

        .distraction-free ea-network-nav, .distraction-free ea-local-nav-advanced {
            display: none;
        }

        .distraction-free > div.app {
            padding-top: 0;
        }

        .distraction-free .editor-container {
            grid-template-columns: 0 !important;
        }

        .hide-toolbox .blocklyToolboxDiv {
            display: none !important;
        }
    `,document.head.appendChild(e)}function Xe(){const e=a.getMainWorkspace(),n=Object.getPrototypeOf(e),o=n.showContextMenu;n.showContextMenu=function(r){W.length=0,N={e:r,options:a.ContextMenu.getOptionsForWorkspace(this),rtl:this.RTL},G(r),o.apply(this,arguments)};const t=Object.getPrototypeOf(e.getTopBlocks(!1)[0]),i=t.showContextMenu;t.showContextMenu=function(r){return W.length=0,N={e:r,options:a.ContextMenu.getOptionsForBlock(this),rtl:this.RTL},G(r),i.apply(this,arguments)}}function Ue(){function e(o){Ye(),Ve(o),setTimeout(function(){BF2042Portal.Plugins.initializeWorkspace()},0)}const n=_Blockly.inject;_Blockly.inject=function(){const o=n.apply(this,arguments);return e(o),o},e(a.getMainWorkspace())}function Ke(){document.addEventListener("keydown",function(e){K=e.shiftKey}),document.addEventListener("keyup",function(e){K=e.shiftKey})}function _e(){for(const i of a.ContextMenu.getAllItems())g(i.value);a.ContextMenu.unregisterItem("cleanWorkspace"),a.ContextMenu.unregisterItem("workspaceDelete");const e=Fe();e.weight=-99,e.options=["items.workspaceDelete","items.separatorWorkspace","items.collapseAllBlocks","items.expandAllBlocks","items.openDocumentation","items.toggleDistractionFreeMode","items.toggleToolbox","items.separatorWorkspace","items.exportBlocksWorkspace","items.importBlocksFromFile"];const n=Oe();n.weight=-99,n.options=["items.deleteModBlock","items.separatorBlock","items.toggleComments","items.toggleInputs","items.toggleCollapse","items.separatorBlock","items.exportBlocksBlock"],_(e),_(n),g(me()),g(fe()),g(ye()),g(he()),g(ke()),g(xe()),g(be()),g(Te()),g(Ce()),g(Be()),g(Se()),g(Me()),g(Ee()),g(we()),g(ve()),g(Ie()),g(Ne());const o=Ae();o.weight=-100,g(o),["items.addBlock","menus.optionsWorkspace","menus.optionsBlock","items.cleanWorkspace","items.jumpToSubRoutine","items.copyToClipboard","items.pasteFromClipboard"].forEach(function(i){let r;if(i.startsWith("items.")){const s=i.substring(6);r=F.items[s]}else if(i.startsWith("menus.")){const s=i.substring(6);r=F.menus[s]}r&&a.ContextMenu.registerItem(r)})}function $e(e){b.push({type:"mod",category:o("RULES"),internalName:"modBlock",displayName:X(a.getTranslation("PYRITE_MOD"))}),b.push({type:"rule",category:o("RULES"),internalName:"ruleBlock",displayName:X(a.getTranslation("PYRITE_RULE"))}),b.push({type:"condition",category:o("RULES"),internalName:"conditionBlock",displayName:X(a.getTranslation("PYRITE_CONDITION"))}),b.push({type:"literal",category:o("LITERALS"),internalName:"Boolean",displayName:a.getTranslation("PYRITE_TYPE_BOOLEAN")}),b.push({type:"literal",category:o("LITERALS"),internalName:"Number",displayName:a.getTranslation("PYRITE_TYPE_NUMBER")}),b.push({type:"literal",category:o("LITERALS"),internalName:"Text",displayName:a.getTranslation("PYRITE_TYPE_STRING")}),b.push({type:"action",category:o("CONVENIENCE"),internalName:"ArrayContains",displayName:a.getTranslation("PYRITE_CONVENIENCE_ARRAYCONTAINS")}),b.push({type:"action",category:o("CONVENIENCE"),internalName:"IndexOfArrayValue",displayName:a.getTranslation("PYRITE_CONVENIENCE_INDEXOFARRAYVALUE")}),b.push({type:"action",category:o("CONVENIENCE"),internalName:"RemoveFromArray",displayName:a.getTranslation("PYRITE_CONVENIENCE_REMOVEFROMARRAY")});const n=[...new Set(e.selectionLists.map(t=>t.listType+"Item"))];for(let t=0;t<e.values.length;t++){const i=e.values[t];i.category||(i.name==="GetVariable"?i.category="VARIABLES":n.includes(i.name)?i.category="SELECTION_LISTS":BF2042Portal.Shared.logError("No category found for value-block",i)),b.push({type:"value",category:o(i.category),internalName:i.name,displayName:a.getTranslation(i.displayNameSID)||i.name})}for(let t=0;t<e.actions.length;t++){const i=e.actions[t];i.category||(i.name==="SetVariable"?i.category="VARIABLES":BF2042Portal.Shared.logError("No category found for action-block",i)),b.push({type:"action",category:o(i.category),internalName:i.name,displayName:a.getTranslation(i.displayNameSID)||i.name})}for(let t=0;t<e.controlActions.length;t++){const i=e.controlActions[t];b.push({type:"controlAction",category:o("CONTROL_ACTIONS"),internalName:i.name,displayName:a.getTranslation(i.displayNameSID)||i.name})}b.forEach(t=>{const i=U.find(r=>r.internalName===(t.category||"Other"));i?i.contents.push(t):U.push({internalName:t.category||"Other",displayName:X(t.category||"Other"),contents:[t]})});function o(t){if(t)return a.getTranslation("PYRITE_TOOLBOX_"+t.replace(" ","_").toUpperCase())}}function Ve(e){let n,o,t;e.addChangeListener(function(i){if(i.type===a.Events.CLICK||i.type===a.Events.SELECTED)if(K){if(!i.blockId)return;const r=e.getBlockById(i.blockId),s=M.indexOf(r);s<0?(M.push(r),r.setHighlighted(!0)):(M.splice(s,1),r.setHighlighted(!1))}else M.length>0&&(M.forEach(r=>{r.setHighlighted(!1)}),M.length=0);else if(i.type===a.Events.BLOCK_DRAG&&!i.isStart)t=i.blockId;else if(i.type===a.Events.MOVE&&i.newCoordinate&&i.oldCoordinate&&t){const r=t;t=void 0,n=i.newCoordinate.x-i.oldCoordinate.x,o=i.newCoordinate.y-i.oldCoordinate.y;for(let s=0;s<M.length;s++){const f=M[s];f.id!==r&&f.moveBy(n,o)}}})}function G(e){const n=a.getMainWorkspace();if(!n)return;const o=a.Xml.mouseToSvg(e,n.getParentSvg(),n.getInverseScreenCTM()),t=n.getMetricsManager().getAbsoluteMetrics();o.x-=t.left,o.y-=t.top,o.x-=n.scrollX,o.y-=n.scrollY,o.x/=n.scale,o.y/=n.scale,E.x=o.x,E.y=o.y}function Ye(){function e(n){if(!n.saveExtraState||!n.loadExtraState||n.mutationToDom&&n.domToMutation)return;n.mutationToDom=function(){const t=a.Xml.createElement("mutation");return t.setAttribute("portal-extensions-state",JSON.stringify(this.saveExtraState())),t};const o=n.domToMutation;n.domToMutation=function(t){const i=t.getAttribute("portal-extensions-state");i?this.loadExtraState(JSON.parse(i)):o&&o.apply(this,arguments)}}for(const n of a.Blocks.getAllClasses())e(n.value);for(const n of a.Blocks.getAllInstances())e(n.value)}const je={};let te=He,oe=e=>{};function ze(){navigator.clipboard.readText===void 0&&(te=Qe,window.addEventListener("bf2042-portal-extensions-paste",async function(e){oe(e.detail)}))}async function Ge(e){return await navigator.clipboard.writeText(e)}async function Je(e){return await navigator.clipboard.write([new ClipboardItem({[e.type]:e})])}async function qe(){return await te()}async function He(){return await navigator.clipboard.readText()}async function Qe(){return new Promise((e,n)=>{oe=t=>{t?e(t):n()};const o=new Event("bf2042-portal-extensions-paste");document.dispatchEvent(o)})}function Ze(){return window.ClipboardItem!==void 0}function et(e,n){console.log(`[ERROR] ${e}`,n)}function tt(e){const n=localStorage.getItem(e);try{if(typeof n=="string")return JSON.parse(n)}catch{}return{}}function ot(e,n){localStorage.setItem(e,JSON.stringify(n))}const nt={copyTextToClipboard:Ge,copyBlobToClipboard:Je,pasteTextFromClipboard:qe,isCopyBlobToClipboardSupported:Ze,loadFromLocalStorage:tt,saveToLocalStorage:ot,logError:et};BF2042Portal.Shared=nt;BF2042Portal.Plugins=de;BF2042Portal.Extensions=je;ze();Le();
//# sourceMappingURL=app.js.map
