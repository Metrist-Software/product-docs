import{_ as n,c as r,a as e,b as a,t as o,e as s,o as i}from"./app.3bd0569a.js";const C=JSON.parse('{"title":"GCP Compute Engine","description":"","frontmatter":{"title":"GCP Compute Engine"},"headers":[{"level":2,"title":"Monitor Specs","slug":"monitor-specs","link":"#monitor-specs","children":[]},{"level":2,"title":"Pre-Requisites","slug":"pre-requisites","link":"#pre-requisites","children":[]},{"level":2,"title":"Orchestrator Environment","slug":"orchestrator-environment","link":"#orchestrator-environment","children":[]}],"relativePath":"monitors/gcpcomputeengine.md","lastUpdated":1680295016000}'),l={name:"monitors/gcpcomputeengine.md"},c={id:"frontmatter-title",tabindex:"-1"},p=e("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),d=s(`<h2 id="monitor-specs" tabindex="-1">Monitor Specs <a class="header-anchor" href="#monitor-specs" aria-hidden="true">#</a></h2><dl><dt>Description</dt><dd>Tests Google Compute Engine to validate that instances can be created, described, and deleted.</dd><dt>Name</dt><dd><code>gcpcomputeengine</code></dd><dt>Packages</dt><dd><a href="./gcpcomputeengine_gcpcomputeengine.html">gcpcomputeengine</a></dd></dl><h2 id="pre-requisites" tabindex="-1">Pre-Requisites <a class="header-anchor" href="#pre-requisites" aria-hidden="true">#</a></h2><ol><li><p>Create your Metrist account. Either <a href="/guides/web-app-invites.html">get an invitation from someone in your team</a> or <a href="https://app.metrist.io/login/signup" target="_blank" rel="noreferrer">create an individual account</a>.</p></li><li><p><a href="/guides/orchestrator-installation.html">Install Metrist Orchestrator</a> in your own environment.</p></li><li><p>Configure Orchestrator with your Metrist API Token and environment variables relevant to this monitor.</p></li><li><p>Register the monitor using <a href="/tools/api.html">Metrist Monitor API</a>.</p></li><li><p>Observe the monitor in your <a href="https://app.metrist.io/" target="_blank" rel="noreferrer">Metrist.io</a> account.</p></li></ol><h2 id="orchestrator-environment" tabindex="-1">Orchestrator Environment <a class="header-anchor" href="#orchestrator-environment" aria-hidden="true">#</a></h2><p>In Orchestrator (the instance in which you want this monitor to run), ensure you have defined at least these environment variables:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">METRIST_API_TOKEN=</span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">METRIST_INSTANCE_ID=</span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">METRIST_RUN_GROUPS=</span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"></span></code></pre></div>`,7);function h(t,u,m,g,_,f){return i(),r("div",null,[e("h1",c,[a(o(t.$frontmatter.title)+" ",1),p]),d])}const T=n(l,[["render",h]]);export{C as __pageData,T as default};
