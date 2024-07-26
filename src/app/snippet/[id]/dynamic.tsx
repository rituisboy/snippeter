import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

function DynamicAceEditor({ mode, theme }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadDependencies() {
      await import(`ace-builds/src-noconflict/mode-${mode}`);
      await import(`ace-builds/src-noconflict/theme-${theme}`);
      setLoaded(true);
    }

    loadDependencies();
  }, [mode, theme]);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <AceEditor
      mode={mode}
      theme={theme}
      // ... other props
    />
  );
}

export default DynamicAceEditor;
