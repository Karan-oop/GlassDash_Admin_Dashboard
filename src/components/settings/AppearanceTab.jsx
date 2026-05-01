import { useState } from "react";
import "./SettingsTabs.css";

export default function AppearanceTab() {
  const [colorMode, setColorMode] = useState("Dark Mode");
  const [accentColor, setAccentColor] = useState("Crimson Red (Default)");
  const [display, setDisplay] = useState({
    compactMode: false,
    animations: true,
    blurEffects: true,
    floatingOrbs: true,
  });

  const toggleDisplay = (key) =>
    setDisplay((prev) => ({ ...prev, [key]: !prev[key] }));

  const resetDefaults = () => {
    setColorMode("Dark Mode");
    setAccentColor("Crimson Red (Default)");
    setDisplay({ compactMode: false, animations: true, blurEffects: true, floatingOrbs: true });
  };

  return (
    <div className="tab-content fade-in">
      <section className="settings-section">
        <h2 className="section-title">Theme</h2>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">Color Mode</span>
            <span className="toggle-desc">Choose your preferred color mode</span>
          </div>
          <select
            className="form-select"
            value={colorMode}
            onChange={(e) => setColorMode(e.target.value)}
          >
            <option>Dark Mode</option>
            <option>Light Mode</option>
            <option>System Default</option>
          </select>
        </div>
        <div className="toggle-row">
          <div className="toggle-info">
            <span className="toggle-title">Accent Color</span>
            <span className="toggle-desc">Choose your preferred accent color</span>
          </div>
          <select
            className="form-select"
            value={accentColor}
            onChange={(e) => setAccentColor(e.target.value)}
          >
            <option>Crimson Red (Default)</option>
            <option>Emerald Green</option>
            <option>Royal Blue</option>
            <option>Amber Gold</option>
            <option>Violet Purple</option>
          </select>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-title">Display</h2>
        {[
          { key: "compactMode", label: "Compact Mode", desc: "Reduce spacing for more content" },
          { key: "animations", label: "Animations", desc: "Enable smooth animations and transitions" },
          { key: "blurEffects", label: "Blur Effects", desc: "Enable glassmorphism blur effects" },
          { key: "floatingOrbs", label: "Floating Orbs", desc: "Show animated background orbs" },
        ].map(({ key, label, desc }) => (
          <div key={key} className="toggle-row">
            <div className="toggle-info">
              <span className="toggle-title">{label}</span>
              <span className="toggle-desc">{desc}</span>
            </div>
            <button
              className={`toggle-switch ${display[key] ? "on" : ""}`}
              onClick={() => toggleDisplay(key)}
              aria-label={`Toggle ${label}`}
            />
          </div>
        ))}
      </section>

      <div className="btn-row">
        <button className="btn-primary">Apply Changes</button>
        <button className="btn-ghost" onClick={resetDefaults}>Reset to Default</button>
      </div>
    </div>
  );
}
