import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
mkdirSync("public/screenshots", { recursive: true });
const shot=(page:Page,name:string)=>page.screenshot({path:`public/screenshots/${name}.png`,fullPage:true});
async function enterVacuum(page:Page){await page.goto("/demo");await page.getByRole("button",{name:"Explain your method"}).click();await page.getByRole("button",{name:"Map reasoning"}).click();await expect(page.getByText("A relationship is unsupported.")).toBeVisible();}
test("capture final named release evidence",async({page},testInfo)=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 if(testInfo.project.name==="mobile"){
  await page.setViewportSize({width:390,height:844}); await enterVacuum(page); await shot(page,"mobile-featured-graph"); return;
 }
 await page.setViewportSize({width:1280,height:720}); await enterVacuum(page);
 await shot(page,"featured-hidden-misconception"); await shot(page,"featured-edge-evidence");
 await page.getByRole("button",{name:"Make prediction"}).click(); await shot(page,"featured-prediction");
 await page.getByLabel("They land together").check(); await page.getByRole("button",{name:"Unlock simulation"}).click(); await page.getByRole("button",{name:"Run simulation"}).click(); await shot(page,"featured-simulation");
 await page.getByRole("button",{name:"Explain again"}).click(); await page.getByRole("button",{name:"Verify repair"}).click(); await expect(page.getByText("Required relations mapped.")).toBeVisible(); await shot(page,"featured-repair-diff");
 await page.getByRole("button",{name:"Test transfer"}).click(); await page.getByRole("button",{name:"Verify transfer"}).click(); await expect(page.getByText("Method repaired. Transfer verified.")).toBeVisible(); await shot(page,"featured-transfer-success");
 await page.goto("/evaluation"); await expect(page.getByRole("heading",{name:"Evaluation"})).toBeVisible(); await shot(page,"evaluation-page");
});
