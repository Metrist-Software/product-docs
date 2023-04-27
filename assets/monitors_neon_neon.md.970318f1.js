import{_ as s,c as n,o,e as a}from"./app.3bd0569a.js";const u=JSON.parse('{"title":"Package Specs","description":"","frontmatter":{},"headers":[{"level":2,"title":"Monitor Environment","slug":"monitor-environment","link":"#monitor-environment","children":[]},{"level":2,"title":"Monitor Config Registration","slug":"monitor-config-registration","link":"#monitor-config-registration","children":[]}],"relativePath":"monitors/neon_neon.md","lastUpdated":1682562326000}'),l={name:"monitors/neon_neon.md"},e=a(`<p><a href="./neon.html">Back to monitor</a></p><h1 id="package-specs" tabindex="-1">Package Specs <a class="header-anchor" href="#package-specs" aria-hidden="true">#</a></h1><dl><dt>Description</dt><dd><p>Monitor Neon&#39;s API</p></dd><dt>Name</dt><dd><p><code>neon</code></p></dd><dt>Package Name</dt><dd><p><code>neon</code></p></dd><dt>Publisher</dt><dd><p>Metrist</p></dd><dt>Version</dt><dd><p>0.1.0-beta</p></dd><dd><p>\xA0</p></dd></dl><h2 id="monitor-environment" tabindex="-1">Monitor Environment <a class="header-anchor" href="#monitor-environment" aria-hidden="true">#</a></h2><p>With a Metrist account and Orchestrator installed, you are ready to configure Orchestrator for use with your new monitor.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># (Required) API key</span></span>
<span class="line"><span style="color:#A6ACCD;">METRIST_NEON_API_KEY=</span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># (Required) The Project Id to create and delete the branches on</span></span>
<span class="line"><span style="color:#A6ACCD;">METRIST_NEON_PROJECT_ID=</span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># (Required) The base branch from which to create the new branch</span></span>
<span class="line"><span style="color:#A6ACCD;">METRIST_NEON_BASE_BRANCH_ID=</span><span style="color:#89DDFF;">&quot;&quot;</span></span>
<span class="line"></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>These values are never transmitted to Metrist \u2014 they are never exposed outside your environment.</p></div><div class="warning custom-block"><p class="custom-block-title">IMPORTANT</p><p>You will need to restart Orchestrator to be sure the new environment variables are available to your new monitor.</p></div><h2 id="monitor-config-registration" tabindex="-1">Monitor Config Registration <a class="header-anchor" href="#monitor-config-registration" aria-hidden="true">#</a></h2><p>With monitor configuration now available in your local instance of Orchestrator, the last step is to inform Metrist of your monitor. Metrist will then run schedule the appropriate tests and record the relevant telemetry data (e.g., \u201Corchestrate\u201D).</p><p>In the following code, adjust the values of <code>interval_secs</code> and <code>run_groups</code> to suit your needs. <code>run_groups</code> <strong>must</strong> include at least 1 value in the list defined in <code>METRIST_RUN_GROUPS</code> environment variable. Leave all other values as they are defined below.</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">monitor_logical_name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">neon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">interval_secs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">120</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">run_groups</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">run_spec</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">neon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">run_type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">exe</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">steps</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">check_logical_name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">CreateBranch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Create a new branch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">timeout_secs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">900</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">check_logical_name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">DeleteBranch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Delete a branch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">timeout_secs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">900</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Convert your monitor config to a JSON string, get your Metrist API token, and use the curl request below to register your monitor:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">json= the json above converted to string</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">api_token=YOUR_TOKEN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">api_token</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">curl -d </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">json -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Content-Type: application/json</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> -H </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Authorization: Bearer </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">api_token</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">https://app.metrist.io/api/v0/monitor-config</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Tip: Our <a href="/tools/api.html">API documentation</a> describes how to delete/unregister the monitor.</p></div><p>That HTTP request should return a key such as <code>11zLBF1eZq9g3wZh86nYXV8</code>. And, if you were running Orchestrator in a terminal window, you will see the following output with a recent timestamp:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">hh:mm:ss.mss monitor={monitor_logical_name}</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">{stepname}</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">info</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">  Initialize monitor with %{extra_config: %{}, id: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">11zLBF1eZq9g3wZh86nYXV8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, interval_secs: 120, last_run_time: nil, monitor_logical_name: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{monitor_logical_name}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, run_spec: %{name: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{monitor_logical_name}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, run_type: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{dll|exe}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">}, steps: </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">%{check_logical_name: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{stepname}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, timeout_secs: 900}</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">hh:mm:ss.mss </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">info</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">  Started child </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">11zLBF1eZq9g3wZh86nYXV8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> with config %{extra_config: nil, id: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">11zLBF1eZq9g3wZh86nYXV8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, interval_secs: 120, last_run_time: nil, monitor_logical_name: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{monitor_logical_name}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, run_spec: %{name: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{monitor_logical_name}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, run_type: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{dll|exe}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">}, steps: </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">%{check_logical_name: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{stepname}</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">, timeout_secs: 900}</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">} as </span><span style="color:#676E95;">#PID&lt;0.####.0&gt;</span></span>
<span class="line"></span></code></pre></div><p>Metrist now runs the monitor through your Orchestrator. As soon as your Orchestrator reports telemetry data to Metrist, your new monitor will be visible at <a href="https://app.metrist.io" target="_blank" rel="noreferrer">app.metrist.io</a>.</p>`,18),p=[e];function t(r,c,D,i,y,F){return o(),n("div",null,p)}const A=s(l,[["render",t]]);export{u as __pageData,A as default};
