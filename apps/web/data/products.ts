export type Product={id:number;name:string;collection:"Homme"|"Femme"|"Mixte";family:string;price:number;notes:string[];accent:string};
export const featuredProducts:Product[]=[
{id:1,name:"Éclat Solaire",collection:"Femme",family:"Floral ambré",price:89,notes:["Bergamote","Jasmin","Vanille"],accent:"from-amber-100 to-orange-200"},
{id:2,name:"Nuit Magnétique",collection:"Homme",family:"Boisé épicé",price:95,notes:["Poivre noir","Cèdre","Ambre"],accent:"from-stone-300 to-stone-600"},
{id:3,name:"Souffle Libre",collection:"Mixte",family:"Hespéridé musqué",price:82,notes:["Citron","Thé blanc","Musc"],accent:"from-lime-100 to-yellow-100"},
{id:4,name:"Velours Royal",collection:"Femme",family:"Gourmand floral",price:99,notes:["Rose","Praline","Santal"],accent:"from-rose-100 to-pink-200"}];
