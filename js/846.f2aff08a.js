"use strict";(self["webpackChunkmoire"]=self["webpackChunkmoire"]||[]).push([[846],{2846:function(l,e,s){s.r(e),s.d(e,{default:function(){return O}});var a=s(3396),i=s(4870),o=s(7139),t=s(9242),r=s(65),c=s(9098),_=s(264),u=s(5786);const n={key:0},d={class:"item"},m={class:"item__pics pics"},p={class:"pics__wrapper"},b=["src","alt"],v={class:"pics__list"},f={class:"pics__item"},g=["src"],w={class:"item__info"},h={class:"item__code"},k={class:"item__title"},S={class:"item__form"},U=["onSubmit"],y={class:"item__row item__row--center"},z={class:"item__price"},C={class:"item__row"},D={class:"form__block"},I=(0,a._)("legend",{class:"form__legend"},"Цвет",-1),H={class:"colors colors--black"},q={class:"colors__item"},P={class:"colors__label"},T=["value"],E={class:"form__block"},K=(0,a._)("legend",{class:"form__legend"},"Размер",-1),M={class:"form__label form__label--small form__label--select"},V=(0,a._)("option",{value:"0"},"Размеры",-1),Y=["value"],Z=(0,a._)("button",{class:"item__button button button--primery",type:"submit"}," В корзину ",-1),F={key:0},W={key:1},j=(0,a.uE)('<div class="item__desc"><ul class="tabs"><li class="tabs__item"><a class="tabs__link tabs__link--current"> Информация о товаре </a></li><li class="tabs__item"><a class="tabs__link" href="#"> Доставка и возврат </a></li></ul><div class="item__content"><h3>Состав:</h3><p> 60% хлопок<br> 30% полиэстер<br></p><h3>Уход:</h3><p> Машинная стирка при макс. 30ºC короткий отжим<br> Гладить при макс. 110ºC<br> Не использовать машинную сушку<br> Отбеливать запрещено<br> Не подвергать химчистке<br></p></div></div>',1);var G={__name:"ProductQuickView",props:{productId:{type:[Number,String],required:!0}},setup(l){const e=l,s=(0,r.oR)(),G=(0,i.iH)(1),{product:N,fetchProduct:O,colorId:Q,sizeId:R}=(0,c.Z)(),x=(0,i.iH)(!1),A=()=>{s.dispatch("addProductToCart",{productId:N.value.id,amount:G.value,colorId:Q.value,sizeId:R.value}),x.value=!0},B=(0,a.Fl)((()=>{const l=N.value.colors.find((l=>l.color.id===Q.value));return void 0===l?N.value.colors[0].gallery[0].file.url:l.gallery?l.gallery[0].file.url:"img/placeholder.png"}));return O(e.productId),(l,e)=>(0,i.SU)(N)?((0,a.wg)(),(0,a.iD)("div",n,[(0,a._)("section",d,[(0,a._)("div",m,[(0,a._)("div",p,[(0,a._)("img",{width:"570",height:"570",src:(0,i.SU)(B)||"/img/placeholder.png",alt:(0,i.SU)(N).title},null,8,b)]),(0,a._)("ul",v,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,i.SU)(N).colors,(l=>((0,a.wg)(),(0,a.iD)("li",f,[(0,a._)("button",{class:(0,o.C_)(["pics__link",l.gallery[0].file.url===(0,i.SU)(B)?"pics__link--current":""])},[(0,a._)("img",{width:"98",height:"98",src:l.gallery[0].file.url||null,alt:"Название товара"},null,8,g)],2)])))),256))])]),(0,a._)("div",w,[(0,a._)("span",h,"Артикул: "+(0,o.zw)((0,i.SU)(N).id),1),(0,a._)("h2",k,(0,o.zw)((0,i.SU)(N).title),1),(0,a._)("div",S,[(0,a._)("form",{class:"form",action:"#",method:"POST",onSubmit:(0,t.iM)(A,["prevent"])},[(0,a._)("div",y,[(0,a.Wm)(_.Z,{amount:G.value,"onUpdate:amount":e[0]||(e[0]=l=>G.value=l),amountModifiers:{number:!0}},null,8,["amount"]),(0,a._)("b",z,(0,o.zw)((0,i.SU)(N).priceFormat)+" ₽ ",1)]),(0,a._)("div",C,[(0,a._)("fieldset",D,[I,(0,a._)("ul",H,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,i.SU)(N).colors,((l,s)=>((0,a.wg)(),(0,a.iD)("li",q,[(0,a._)("label",P,[(0,a.wy)((0,a._)("input",{class:"colors__radio sr-only",type:"radio",name:"color-item",value:l.color.id,"onUpdate:modelValue":e[1]||(e[1]=l=>(0,i.dq)(Q)?Q.value=l:null)},null,8,T),[[t.G2,(0,i.SU)(Q)]]),(0,a._)("span",{class:"colors__value",style:(0,o.j5)({backgroundColor:l.color.code})},null,4)])])))),256))])]),(0,a._)("fieldset",E,[K,(0,a._)("label",M,[(0,a.wy)((0,a._)("select",{class:"form__select",name:"sizes","onUpdate:modelValue":e[2]||(e[2]=l=>(0,i.dq)(R)?R.value=l:null)},[V,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,i.SU)(N).sizes,(l=>((0,a.wg)(),(0,a.iD)("option",{value:l.id,key:l.id},(0,o.zw)(l.title),9,Y)))),128))],512),[[t.bM,(0,i.SU)(R)]])])])]),Z,(0,a.Wm)(u.Z,{open:x.value,"onUpdate:open":e[3]||(e[3]=l=>x.value=l)},{default:(0,a.w5)((()=>[(0,i.SU)(s).state.addToCartError?((0,a.wg)(),(0,a.iD)("p",W,(0,o.zw)((0,i.SU)(s).state.addToCartError),1)):((0,a.wg)(),(0,a.iD)("p",F,"Товар Добавлен в корзину"))])),_:1},8,["open"])],40,U)])]),j])])):(0,a.kq)("",!0)}};const N=G;var O=N}}]);
//# sourceMappingURL=846.f2aff08a.js.map