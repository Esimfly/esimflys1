import { useState } from "react";

export default function Home() {
  const [iccid, setIccid] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function getProgressColor(percentage) {
    const red = Math.min(255, Math.floor((percentage / 100) * 255));
    const green = Math.max(0, 255 - red);
    return `rgb(${red}, ${green}, 0)`;
  }

  function startCountdown(endTime, update) {
    function tick() {
      const now = new Date().getTime();
      const distance = endTime - now;
      if (distance < 0) return update("Expired");
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      update(`Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
    tick();
    return setInterval(tick, 1000);
  }

  async function checkData() {
    setError("");
    setResult(null);
    if (!iccid.trim()) {
      setError("Please enter ICCID.");
      return;
    }

    try {
      const res = await fetch(`/api/check?iccid=${encodeURIComponent(iccid.trim())}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      if (!data.bundles || data.bundles.length === 0) {
        setError("No data found for this ICCID.");
        return;
      }

      // prepare bundles with countdown text state
      const bundlesWithCountdown = data.bundles.map(bundle => {
        const assignment = bundle.assignments?.[0];
        if (!assignment) return null;
        const initial = assignment.initialQuantity;
        const remaining = assignment.remainingQuantity;
        const usedBytes = initial - remaining;
        const initialMB = initial / 1_000_000;
        const remainingMB = remaining / 1_000_000;
        const usedMB = usedBytes / 1_000_000;
        const totalGB = (initialMB / 1000).toFixed(3);
        const remainingGB = (remainingMB / 1000).toFixed(3);
        const usedGB = (usedMB / 1000).toFixed(3);
        const percentage = ((usedMB / initialMB) * 100).toFixed(1);
        const endDate = new Date(assignment.endTime);
        const expiryFormatted = `${endDate.getDate().toString().padStart(2, '0')}/${
          (endDate.getMonth() + 1).toString().padStart(2, '0')
        }/${endDate.getFullYear()} ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

        return {
          iccid,
          description: bundle.description,
          usedGB,
          remainingGB,
          expiryFormatted,
          percentage,
          barColor: getProgressColor(percentage),
          endTime: endDate.getTime(),
          countdownText: "Loading...",
          setCountdownText: null,
        };
      }).filter(Boolean);

      setResult(bundlesWithCountdown);

      // start countdowns
      bundlesWithCountdown.forEach((bundle, idx) => {
        const updateCountdown = (text) => {
          setResult(current => {
            if (!current) return current;
            const updated = [...current];
            updated[idx] = {...updated[idx], countdownText: text};
            return updated;
          });
        };
        bundle.setCountdownText = updateCountdown;
        startCountdown(bundle.endTime, updateCountdown);
      });

    } catch {
      setError("Error fetching data");
    }
  }

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          margin: 0;
          background-color: #f4f4f4;
          text-align: center;
        }
        .logo-container {
          margin-bottom: 20px;
        }
        .logo-container img {
          width: 160px;
          height: auto;
          border-radius: 10px;
          object-fit: contain;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .container {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          max-width: 500px;
          margin: auto;
          box-shadow: 0 0 10px rgba(3, 143, 236, 0.3);
        }
        input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          margin: 10px 0;
          border-radius: 8px;
          border: 1px solid #ccc;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #1100ff;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        #result {
          margin-top: 25px;
        }
        .whatsapp-inline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background-color: #25D366;
          color: white;
          border-radius: 30px;
          font-weight: bold;
          text-decoration: none;
          margin-bottom: 20px;
        }
        .whatsapp-inline img {
          width: 20px;
          height: 20px;
        }
        .progress-bar {
          height: 20px;
          border-radius: 10px;
          background-color: #e0e0e0;
          overflow: hidden;
          margin: 10px 0;
        }
        .progress-bar-fill {
          height: 100%;
          transition: width 0.5s;
        }
        .countdown {
          font-weight: bold;
          margin-top: 10px;
        }
        @media (max-width: 600px) {
          .container {
            padding: 15px;
          }
          input, button {
            font-size: 15px;
          }
          .logo-container img {
            width: 120px;
          }
        }
      `}</style>

      <div className="logo-container">
        <img src="https://files.catbox.moe/s83b16.png" alt="Company Logo" />
      </div>

      <a href="https://wa.me/97336636509" target="_blank" rel="noreferrer" className="whatsapp-inline">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        WhatsApp
      </a>

      <a href="https://www.instagram.com/esim_fly?igsh=YXJlem8wcWE3YWtu" target="_blank" rel="noreferrer" className="whatsapp-inline" style={{backgroundColor: "#E1306C"}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
        Instagram
      </a>

      <div className="container">
        <h2>Check Data Usage</h2>
        <input
          type="text"
          id="iccid"
          placeholder="89.....Enter ICCID...."
          value={iccid}
          onChange={(e) => setIccid(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") checkData(); }}
        />
        <button onClick={checkData}>Check</button>

        <div id="result">
          {error && <p style={{color:"red"}}>{error}</p>}

          {result && result.map((bundle, idx) => (
            <div
              key={idx}
              style={{
                background: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                marginTop: "20px"
              }}
            >
              <p><strong>ICCID:</strong> {bundle.iccid}</p>
              <p><strong>Bundle:</strong> {bundle.description}</p>
              <p><strong>Data Usage:</strong> {bundle.usedGB} GB</p>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${bundle.percentage}%`, backgroundColor: bundle.barColor }}
                ></div>
              </div>
              <p><strong>Data Balance:</strong> {bundle.remainingGB} GB</p>
              <p><strong>Expiry Date:</strong> {bundle.expiryFormatted}</p>
              <p className="countdown">{bundle.countdownText}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}