That HTTP request should return a key such as `11zLBF1eZq9g3wZh86nYXV8`. And, if you were running Orchestrator in a terminal window, you will see the following output with a recent timestamp:

```sh
hh:mm:ss.mss monitor={monitor_logical_name}({stepname}) [info]  Initialize monitor with %{extra_config: %{}, id: "11zLBF1eZq9g3wZh86nYXV8", interval_secs: 120, last_run_time: nil, monitor_logical_name: "{monitor_logical_name}", run_spec: %{name: "{monitor_logical_name}", run_type: "{dll|exe}"}, steps: [%{check_logical_name: "{stepname}", timeout_secs: 900}]}

hh:mm:ss.mss [info]  Started child "11zLBF1eZq9g3wZh86nYXV8" with config %{extra_config: nil, id: "11zLBF1eZq9g3wZh86nYXV8", interval_secs: 120, last_run_time: nil, monitor_logical_name: "{monitor_logical_name}", run_spec: %{name: "{monitor_logical_name}", run_type: "{dll|exe}"}, steps: [%{check_logical_name: "{stepname}", timeout_secs: 900}]} as #PID<0.####.0>
```
