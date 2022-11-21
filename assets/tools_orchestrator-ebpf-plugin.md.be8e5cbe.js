import{_ as a,c as n,a as e,b as i,t as r,e as s,o}from"./app.e1882757.js";const w=JSON.parse('{"title":"Orchestrator eBFP Plugin","description":"","frontmatter":{"title":"Orchestrator eBFP Plugin"},"headers":[{"level":2,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":2,"title":"Mechanism","slug":"mechanism","link":"#mechanism","children":[]},{"level":2,"title":"Limitations","slug":"limitations","link":"#limitations","children":[]},{"level":2,"title":"System requirements","slug":"system-requirements","link":"#system-requirements","children":[]},{"level":2,"title":"Installation","slug":"installation","link":"#installation","children":[]}],"relativePath":"tools/orchestrator-ebpf-plugin.md","lastUpdated":1669071708000}'),l={name:"tools/orchestrator-ebpf-plugin.md"},h={id:"frontmatter-title",tabindex:"-1"},d=e("a",{class:"header-anchor",href:"#frontmatter-title","aria-hidden":"true"},"#",-1),c=s(`<h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-hidden="true">#</a></h2><p>The Metrist Orchestrator eBPF Plugin uses the Linux kernel&#39;s <a href="https://ebpf.io/" target="_blank" rel="noreferrer">eBPF</a> functionality to help discover all outgoing API calls. Any call that a monitored node makes is sent to the configured Orchestrator&#39;s endpoint for <a href="/tools/orchestrator-source-code.html#in-process-forwarding">In-process forwarding</a> for further processing. Unknown API calls will be logged (both by Orchestrator as well as by this plugin) and known API calls will be converted into Service/check pairs and sent to the Metrist backend as regular monitoring metrics.</p><h2 id="mechanism" tabindex="-1">Mechanism <a class="header-anchor" href="#mechanism" aria-hidden="true">#</a></h2><p>The plugin contains and loads a couple of eBPF programs that will end up tracing all outgoing TLS/SSL calls. Anything intercepted gets sent from the eBPF level (in the Linux kernel) to the userspace part of the code for further processing. Because the plugin intercepts calls on the library level, it can look at data before it is encrypted and thus figure out what the actual host, method and path are for an API call. This is impossible to do at, for example, the networking level.</p><p>Once host, method and path are found for a call, the plugin forwards data to its configured Orchestrator. The latter sees the data as regular &quot;in-process agent&quot; data and will therefore process it against its in-process configuration.</p><h2 id="limitations" tabindex="-1">Limitations <a class="header-anchor" href="#limitations" aria-hidden="true">#</a></h2><p>Plain HTTP traffic is ignored. Because, the sort of APIs we are interested in, in the context of Metrist\u2019s vendor management functionality, typically are not sent in the clear over the public internet.</p><p>At the moment, we only monitor traffic from software that uses the OpenSSL library and only if it has been dynamically linked against it. We do not yet support other TLS libraries, like GNU TLS or BoringSSL; contact us if you need support for these.</p><p>Certain languages do not use external dynamically linked libraries. Mainstream languages we are aware of that we can not monitor this way:</p><ul><li>Languages on the JVM (Java, Scala, Clojure, Kotlin, etc). The JVM has a TLS implementation that is implemented in Java. So, we cannot hook into it through eBPF.</li><li>Languages on the BEAM (Erlang, Elixir). Similarly, the BEAM has a TLS implementation implemented in Erlang.</li><li>Golang. Golang delivers statically linked executables and thus does not give us the hooks we need to monitor it.</li></ul><p>For all of these, you can still use the regular in-process monitoring. This does mean, however, that you lose the opportunity of system-wide discovery.</p><h2 id="system-requirements" tabindex="-1">System requirements <a class="header-anchor" href="#system-requirements" aria-hidden="true">#</a></h2><p>The plugin requires a Linux kernel version 5.8 or later and will refuse to run on earlier kernels. eBPF is quite new and still under heavy development and we need to use some newer features of the subsystem.</p><p>The plugin is distributed as a Linux package or a self-contained executable and does not require anything special to run. Memory usage should be in the order of a handful of megabytes.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-hidden="true">#</a></h2><p>We support Linux distributions as-needed. So, if you don&#39;t see yours and you want support with a platform-native installation package, please let us know.</p><p>Our distribution packages are signed with PGP/GnuPG. We distribute a keyring file with <a href="https://github.com/Metrist-Software/orchestrator/blob/dist/trustedkeys.gpg" target="_blank" rel="noreferrer">trusted keys</a> you can install prior to downloading so you can verify that the distribution packages were indeed built by us.</p><h1 id="ubuntu-20-04" tabindex="-1">Ubuntu 20.04 <a class="header-anchor" href="#ubuntu-20-04" aria-hidden="true">#</a></h1><p>We distribute a package containing the executable and a simple systemd script for easy installation on Ubuntu 20.04. The following steps will install the plugin with a default configuration (talking to an Orchestrator instance on localhost):</p><pre><code>cd /tmp # This is important other wise apt-get install will fail
plugin_latest=$(curl http://dist.metrist.io/orchestrator-plugins/ebpf/ubuntu/20.04.x86_64.latest.txt)
wget http://dist.metrist.io/orchestrator-plugins/ebpf/ubuntu/$plugin_latest
wget http://dist.metrist.io/orchestrator-plugins/ebpf/ubuntu/$plugin_latest.asc
gpg --verify $plugin_latest.asc
apt-get install -y ./metrist*.deb
</code></pre><p>A standard environment file is in /etc/default/metrist-ebpf-agent and can be changed to point the plugin at an Orchestrator running elsewhere:</p><pre><code>cat &lt;&lt;EOF &gt;/etc/default/metrist-ebpf-agent
METRIST_ORCHESTRATOR_ENDPOINT=&lt;your_orchestrator_host&gt;:51713
EOF
</code></pre><p>When all is done, the standard systemd invocation will start the service:</p><pre><code>systemctl enable metrist-ebpf-agent
systemctl start metrist-ebpf-agent
</code></pre><h1 id="other-systems" tabindex="-1">Other systems <a class="header-anchor" href="#other-systems" aria-hidden="true">#</a></h1><p>If your system has a young enough kernel version, you may install the executable by hand:</p><pre><code>latest=$(curl http://dist.metrist.io/orchestrator-plugins/ebpf/latest-x86_64.txt)
wget http://dist.metrist.io/orchestrator-plugins/ebpf/$latest.tar.gz
wget http://dist.metrist.io/orchestrator-plugins/ebpf/$latest.tar.gz.asc
gpg --verify $latest.tar.gz.asc
tar xvfz $latest.tar.gz
</code></pre><p>From there, you can run the resulting executable (<code>metrist-ebpf-agent</code>) from the command line or as a daemon started by your system&#39;s supervisor. The only setting is the <code>METRIST_ORCHESTRATOR_ENDPOINT</code> environment variable.</p>`,28);function u(t,p,g,m,f,b){return o(),n("div",null,[e("h1",h,[i(r(t.$frontmatter.title)+" ",1),d]),c])}const _=a(l,[["render",u]]);export{w as __pageData,_ as default};
