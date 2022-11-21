import{_ as t,c as n,a as s,b as e,t as o,e as l,o as p}from"./app.e1882757.js";const m=JSON.parse('{"title":"Install Metrist Orchestrator","description":"","frontmatter":{"title":"Install Metrist Orchestrator"},"headers":[{"level":2,"title":"Verification of Binaries","slug":"verification-of-binaries","link":"#verification-of-binaries","children":[]},{"level":2,"title":"API Token","slug":"api-token","link":"#api-token","children":[]},{"level":2,"title":"Docker Installation","slug":"docker-installation","link":"#docker-installation","children":[]},{"level":2,"title":"Debian Package Installation","slug":"debian-package-installation","link":"#debian-package-installation","children":[{"level":3,"title":"Unsupported Platforms with Debian Package Format","slug":"unsupported-platforms-with-debian-package-format","link":"#unsupported-platforms-with-debian-package-format","children":[]}]},{"level":2,"title":"Amazon Linux Package Installation","slug":"amazon-linux-package-installation","link":"#amazon-linux-package-installation","children":[{"level":3,"title":"(Optional) Verifying the Package","slug":"optional-verifying-the-package","link":"#optional-verifying-the-package","children":[]}]},{"level":2,"title":"Installation From Source","slug":"installation-from-source","link":"#installation-from-source","children":[{"level":3,"title":"Without asdf","slug":"without-asdf","link":"#without-asdf","children":[]}]}],"relativePath":"guides/orchestrator-installation.md","lastUpdated":1669071708000}'),r={name:"guides/orchestrator-installation.md"},i={id:"frontmatter-title",tabindex:"-1"},c=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),d=l(`<p>To install Orchestrator the easy way, simply run</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">curl https://dist.metrist.io/install.sh </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">/tmp/install.sh</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> bash /tmp/install.sh</span></span>
<span class="line"></span></code></pre></div><p>and follow the prompts. If you are running on a platform that the script support, you will end up with a running copy of Orchestrator.</p><p>We do not support every combination of operating system and (in Linux\u2019 case) distribution. If the script detects that your system is not supported for guided installation, it will refer you back here. Please see the rest of the document for more installation options. These options are also a good starting point for unattended installations.</p><p>The shell command above will fail in a VM running in WSL (Windows Subsystem for Linux). We recommend Windows users skip to the section below about <a href="#docker-installation">Docker installation</a>.</p><h2 id="verification-of-binaries" tabindex="-1">Verification of Binaries <a class="header-anchor" href="#verification-of-binaries" aria-hidden="true">#</a></h2><p>All binaries are signed by a key that is listed in our <a href="https://github.com/Metrist-Software/orchestrator/blob/dist/trustedkeys.gpg?raw=true" target="_blank" rel="noreferrer">public keyring</a>. This means that you can fetch our keyring:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">wget -O /tmp/metrist.gpg https://github.com/Metrist-Software/orchestrator/blob/dist/trustedkeys.gpg</span><span style="color:#89DDFF;">?</span><span style="color:#A6ACCD;">raw=true</span></span>
<span class="line"></span></code></pre></div><p>and use the verification commands listed with the download commands in the rest of this document.</p><h2 id="api-token" tabindex="-1">API Token <a class="header-anchor" href="#api-token" aria-hidden="true">#</a></h2><p>You will need your API key to run Metrist Orchestrator, which you can get from <a href="https://app.metrist.io/profile" target="_blank" rel="noreferrer">https://app.metrist.io/profile</a>. Scripts below expect to find it in the environment:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> METRIST_API_TOKEN=</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">your key here</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="docker-installation" tabindex="-1">Docker Installation <a class="header-anchor" href="#docker-installation" aria-hidden="true">#</a></h2><p>We distribute a Docker image for Orchestrator. You can get the image name from our distribution site:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">latest=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">curl https://dist.metrist.io/orchestrator/docker/orchestrator-latest.txt</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">docker run </span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">run-args...</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">latest</span></span>
<span class="line"></span></code></pre></div><p><code>run-args</code> depends on what you want to do with Orchestrator. In the simplest case, for only running private synthetic monitoring, you just need to add an API token using <code>-e METRIST_API_TOKEN=&lt;your key&gt;</code>. If you want to export Orchestrator&#39;s listening port for in-process monitoring, you should add <code>-p 51712:51712/udp</code>. With both, for example:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">docker run -e METRIST_API_TOKEN=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">METRIST_API_TOKEN -p 51712:51712/udp </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">latest</span></span>
<span class="line"></span></code></pre></div><h2 id="debian-package-installation" tabindex="-1">Debian Package Installation <a class="header-anchor" href="#debian-package-installation" aria-hidden="true">#</a></h2><p>Systems supported:</p><ul><li>Ubuntu for x86, 64 bit: 20.04, 22.04</li></ul><p>If you are on a supported system for Debian package installation, you can simply download the package:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo apt install -y wget gpg curl</span></span>
<span class="line"><span style="color:#A6ACCD;">orch_latest=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">curl https://dist.metrist.io/orchestrator/ubuntu/20.04.x86_64.latest.txt</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://dist.metrist.io/orchestrator/ubuntu/</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://dist.metrist.io/orchestrator/ubuntu/</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest.asc</span></span>
<span class="line"><span style="color:#A6ACCD;">gpg --verify --keyring=/tmp/metrist.gpg </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest.asc</span></span>
<span class="line"></span></code></pre></div><p>(Where &quot;20.04&quot; is replaced by the distribution you are using.)</p><p>Installation then proceeds by installing the package:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo apt install -y ./</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest</span></span>
<span class="line"></span></code></pre></div><p>And adding your API key:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">cat </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#C3E88D;"> | sudo tee -a /etc/default/metrist-orchestrator</span></span>
<span class="line"><span style="color:#C3E88D;">METRIST_API_TOKEN=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">METRIST_API_TOKEN</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span>
<span class="line"></span></code></pre></div><p>You can then proceed to start the software using systemd:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo systemctl </span><span style="color:#82AAFF;">enable</span><span style="color:#A6ACCD;"> --now metrist-orchestrator</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo systemctl start metrist-orchestrator</span></span>
<span class="line"></span></code></pre></div><p>A quick <code>journalctl --unit metrist-orchestrator</code> should show a running program.</p><h3 id="unsupported-platforms-with-debian-package-format" tabindex="-1">Unsupported Platforms with Debian Package Format <a class="header-anchor" href="#unsupported-platforms-with-debian-package-format" aria-hidden="true">#</a></h3><p>Note that the above Debian package <em>should</em> work for Ubuntu/Debian-like platforms that have the same C libraries as the supported Ubuntu versions (like actual Debian distributions and non-LTS Ubuntu versions). We do not support this, however. Please contact us if you want your system added to the list.</p><h2 id="amazon-linux-package-installation" tabindex="-1">Amazon Linux Package Installation <a class="header-anchor" href="#amazon-linux-package-installation" aria-hidden="true">#</a></h2><p>Systems supported:</p><ul><li>Amazon Linux 2</li></ul><p>You can simply download the package:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo yum install wget curl</span></span>
<span class="line"><span style="color:#A6ACCD;">orch_latest=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">curl https://dist.metrist.io/orchestrator/amazon-linux/2.x86_64.latest.txt</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://dist.metrist.io/orchestrator/amazon-linux/</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest</span></span>
<span class="line"></span></code></pre></div><h3 id="optional-verifying-the-package" tabindex="-1">(Optional) Verifying the Package <a class="header-anchor" href="#optional-verifying-the-package" aria-hidden="true">#</a></h3><p>Amazon Linux 2 includes a gpg version &lt; 2.1 so verification would have to be done outside the Amazon Linux 2 machine using a gpg version &gt;= 2.1 to support the Keybox keyring format of our trustedkeys.gpg.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">orch_latest=</span><span style="color:#89DDFF;">$(</span><span style="color:#C3E88D;">curl https://dist.metrist.io/orchestrator/amazon-linux/2.x86_64.latest.txt</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://dist.metrist.io/orchestrator/amazon-linux/</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://dist.metrist.io/orchestrator/amazon-linux/</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest.asc</span></span>
<span class="line"><span style="color:#A6ACCD;">gpg --verify --keyring=/tmp/metrist.gpg </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest.asc</span></span>
<span class="line"></span></code></pre></div><p>Installation then proceeds by installing the package:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo yum localinstall ./</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">orch_latest</span></span>
<span class="line"></span></code></pre></div><p>And add your API key:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">cat </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#C3E88D;"> | sudo tee -a /etc/default/metrist-orchestrator</span></span>
<span class="line"><span style="color:#C3E88D;">METRIST_API_TOKEN=</span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">METRIST_API_TOKEN</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span>
<span class="line"></span></code></pre></div><p>You can then proceed to start the software using systemd:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">sudo systemctl </span><span style="color:#82AAFF;">enable</span><span style="color:#A6ACCD;"> --now metrist-orchestrator</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo systemctl start metrist-orchestrator</span></span>
<span class="line"></span></code></pre></div><p>A quick <code>journalctl --unit metrist-orchestrator</code> should show a running program.</p><h2 id="installation-from-source" tabindex="-1">Installation From Source <a class="header-anchor" href="#installation-from-source" aria-hidden="true">#</a></h2><p>Installation from source is simplest using <a href="https://asdf-vm.com/" target="_blank" rel="noreferrer">asdf-vm</a>. Just fetch the source code from Git, install dependencies using <code>asdf</code>, and build:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">git clone git@github.com:Metrist-Software/orchestrator.git</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> orchestrator</span></span>
<span class="line"><span style="color:#A6ACCD;">asdf install</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> MIX_ENV=prod</span></span>
<span class="line"><span style="color:#A6ACCD;">mix </span><span style="color:#89DDFF;">do</span><span style="color:#A6ACCD;"> deps.get, compile, release</span></span>
<span class="line"></span></code></pre></div><p>This will create an executable <code>_build/prod/rel/bakeware/orchestrator</code> that you can then directly run (assuming that you have set the API key as above).</p><h3 id="without-asdf" tabindex="-1">Without asdf <a class="header-anchor" href="#without-asdf" aria-hidden="true">#</a></h3><p>If you do not or can not use asdf-vm, please check the <code>.tool-versions</code> file for dependencies. You will, at a minimum, need current versions of Erlang and Elixir.</p>`,53);function h(a,u,y,g,C,D){return p(),n("div",null,[s("h1",i,[e(o(a.$frontmatter.title)+" ",1),c]),d])}const f=t(r,[["render",h]]);export{m as __pageData,f as default};
