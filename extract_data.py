import pandas as pd
import json
import re

def update_html():
    try:
        # Load Dirty Data (CSV)
        dirty_df = pd.read_csv('public/dirty_cafe_sales.csv', nrows=100)
        dirty_data = dirty_df.astype(str).to_dict(orient='records')
        
        # Load Clean Data (Excel)
        clean_df = pd.read_excel('public/dirty_cafe_sales_cleaned.xlsx', nrows=100)
        clean_data = clean_df.astype(str).to_dict(orient='records')
        
        dirty_json = json.dumps(dirty_data)
        clean_json = json.dumps(clean_data)
        
        # Define the JS logic to append
        js_logic = f"""
      // ── DATA EXPLORER JS ─────────────────────────────────────────
      const DIRTY_DATA = {dirty_json};
      const CLEAN_DATA = {clean_json};
      const DF_COLS = ['Transaction ID', 'Item', 'Quantity', 'Price Per Unit', 'Total Spent', 'Payment Method', 'Location', 'Transaction Date'];
      const DF_BAD = new Set(['ERROR', 'UNKNOWN', '']);
      let dfView = 'dirty', dfPage = 1, dfSort = null, dfDir = 1;

      function dfGetData() {{ return dfView === 'dirty' ? DIRTY_DATA : CLEAN_DATA; }}
      function dfBad(v) {{ return DF_BAD.has(String(v).trim()); }}

      function dfPopFilters(data) {{
        function fill(id, key) {{
          const s = document.getElementById(id), cur = s.value;
          if(!s) return;
          s.innerHTML = `<option value="">All ${{key}}</option>`;
          [...new Set(data.map(r => r[key]).filter(v => !dfBad(v)))].sort().forEach(v => {{
            const o = document.createElement('option'); o.value = o.textContent = v; s.appendChild(o);
          }});
          if (cur) s.value = cur;
        }}
        fill('dfFItem', 'Item'); fill('dfFPay', 'Payment Method'); fill('dfFLoc', 'Location');
      }}

      function dfFiltered() {{
        let d = dfGetData();
        const searchInput = document.getElementById('dfSearch');
        const q = searchInput ? searchInput.value.toLowerCase() : '';
        const itemInput = document.getElementById('dfFItem');
        const fi = itemInput ? itemInput.value : '';
        const payInput = document.getElementById('dfFPay');
        const fp = payInput ? payInput.value : '';
        const locInput = document.getElementById('dfFLoc');
        const fl = locInput ? locInput.value : '';
        
        d = d.filter(r => {{
          if (fi && r['Item'] !== fi) return false;
          if (fp && r['Payment Method'] !== fp) return false;
          if (fl && r['Location'] !== fl) return false;
          if (q && !Object.values(r).join(' ').toLowerCase().includes(q)) return false;
          return true;
        }});
        if (dfSort !== null) {{
          const col = DF_COLS[dfSort];
          d = [...d].sort((a, b) => String(a[col]).localeCompare(String(b[col]), undefined, {{ numeric: true }}) * dfDir);
        }}
        return d;
      }}

      function dfRenderStats(data) {{
        const bar = document.getElementById('dfStatsBar');
        if(!bar) return;
        if (dfView === 'dirty') {{
          let errs = 0;
          data.forEach(r => DF_COLS.forEach(c => {{ if (dfBad(r[c])) errs++; }}));
          const pct = data.length ? ((errs / (data.length * DF_COLS.length)) * 100).toFixed(1) : 0;
          bar.innerHTML = `
          <div class="df-stat-cell"><div class="df-stat-label">Rows</div><div class="df-stat-val">${{data.length}}</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Dirty Cells</div><div class="df-stat-val ev">${{errs}}</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Error Rate</div><div class="df-stat-val ev">${{pct}}%</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Columns</div><div class="df-stat-val">8</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Unique Items</div><div class="df-stat-val">${{new Set(data.map(r => r['Item']).filter(v => !dfBad(v))).size}}</div></div>`;
        }} else {{
          const rev = data.reduce((s, r) => s + (parseFloat(r['Total Spent']) || 0), 0);
          bar.innerHTML = `
          <div class="df-stat-cell"><div class="df-stat-label">Rows</div><div class="df-stat-val gv">${{data.length}}</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Dirty Cells</div><div class="df-stat-val gv">0</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Revenue</div><div class="df-stat-val gv">${{rev.toLocaleString(undefined, {{ maximumFractionDigits: 0 }})}}</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Columns</div><div class="df-stat-val">8</div></div>
          <div class="df-stat-cell"><div class="df-stat-label">Unique Items</div><div class="df-stat-val">${{new Set(data.map(r => r['Item'])).size}}</div></div>`;
        }}
      }}

      function dfCellClass(col, val) {{
        if (dfView === 'dirty') return '';
        if (col === 'Item') return 'ci';
        if (['Quantity', 'Price Per Unit', 'Total Spent'].includes(col)) return 'cn';
        if (col === 'Payment Method') {{ if (val === 'Digital Wallet') return 'cpd'; if (val === 'Cash') return 'cpc'; return 'cpp'; }}
        if (col === 'Location') return val.includes('In-store') ? 'clin' : 'clta';
        return '';
      }}

      function dfRender() {{
        const data = dfFiltered();
        const total = data.length;
        const pages = Math.max(1, Math.ceil(total / 25));
        
        if (dfPage > pages) dfPage = 1;
        
        const slice = data.slice((dfPage - 1) * 25, dfPage * 25);

        const infoEl = document.getElementById('dfInfo');
        if (infoEl) infoEl.textContent = `${{slice.length}} / ${{total}} rows`;
        
        dfRenderStats(data);

        const thead = document.getElementById('dfThead');
        if (thead) {{
            thead.innerHTML = '';
            const hr = thead.insertRow();
            
            const th0 = document.createElement('th'); 
            th0.textContent = '#'; 
            th0.style.minWidth = '36px'; 
            hr.appendChild(th0);
            
            DF_COLS.forEach((col, ci) => {{
              const th = document.createElement('th');
              th.textContent = col;
              if (dfSort === ci) th.className = dfDir === 1 ? 'sa' : 'sd';
              th.onclick = () => {{ 
                  dfSort === ci ? dfDir *= -1 : (dfSort = ci, dfDir = 1); 
                  dfPage = 1; 
                  dfRender(); 
              }};
              hr.appendChild(th);
            }});
        }}

        const tbody = document.getElementById('dfTbody');
        if (tbody) {{
            tbody.innerHTML = '';
            
            if (!slice.length) {{
              const tr = tbody.insertRow();
              const td = tr.insertCell();
              td.colSpan = 9; 
              td.textContent = 'No matching rows';
              td.style.cssText = 'text-align:center;color:var(--muted);padding:2rem';
            }} else {{
                const base = (dfPage - 1) * 25;
                slice.forEach((row, ri) => {{
                  const tr = tbody.insertRow();
                  
                  const idx = tr.insertCell(); 
                  idx.className = 'df-idx'; 
                  idx.textContent = base + ri + 1;
                  
                  DF_COLS.forEach(col => {{
                    const td = tr.insertCell();
                    const val = String(row[col] ?? '');
                    
                    if (dfView === 'dirty') {{
                      if (val === 'ERROR' || val === 'UNKNOWN') {{ 
                          td.className = 'ce'; 
                          td.textContent = val; 
                      }} else if (val.trim() === '') {{ 
                          td.className = 'cem'; 
                          td.textContent = '(empty)'; 
                      }} else {{
                          td.textContent = val;
                      }}
                    }} else {{
                      if (col === 'Item') td.className = 'ci';
                      else if (['Quantity', 'Price Per Unit', 'Total Spent'].includes(col)) td.className = 'cn';
                      else if (col === 'Payment Method') {{ 
                          if (val === 'Digital Wallet') td.className = 'cpd'; 
                          else if (val === 'Cash') td.className = 'cpc'; 
                          else td.className = 'cpp'; 
                      }} else if (col === 'Location') {{
                          td.className = val.includes('In-store') ? 'clin' : 'clta';
                      }}
                      
                      td.textContent = val;
                    }}
                  }});
                }});
            }}
        }}

        const pg = document.getElementById('dfPagination');
        if (pg) {{
            pg.innerHTML = '';
            
            const createBtn = (lbl, p, isActive, isDisabled) => {{
              const b = document.createElement('button');
              b.className = 'df-pb' + (isActive ? ' ap' : '');
              b.textContent = lbl; 
              b.disabled = !!isDisabled;
              
              if (!isDisabled && !isActive) {{
                  b.onclick = () => {{ dfPage = p; dfRender(); }};
              }}
              return b;
            }};

            pg.appendChild(createBtn('‹', dfPage - 1, false, dfPage === 1));
            
            let s = Math.max(1, dfPage - 2);
            let e = Math.min(pages, dfPage + 2);
            
            if (dfPage <= 3) e = Math.min(5, pages);
            if (dfPage >= pages - 2) s = Math.max(1, pages - 4);

            if (s > 1) {{ 
                pg.appendChild(createBtn('1', 1, false, false)); 
                if (s > 2) {{ 
                    const sp = document.createElement('span'); 
                    sp.className = 'df-pi'; 
                    sp.textContent = '…'; 
                    pg.appendChild(sp); 
                }} 
            }}
            
            for (let p = s; p <= e; p++) {{
                pg.appendChild(createBtn(p, p, p === dfPage, false));
            }}
            
            if (e < pages) {{ 
                if (e < pages - 1) {{ 
                    const sp = document.createElement('span'); 
                    sp.className = 'df-pi'; 
                    sp.textContent = '…'; 
                    pg.appendChild(sp); 
                }} 
                pg.appendChild(createBtn(pages, pages, false, false)); 
            }}
            
            pg.appendChild(createBtn('›', dfPage + 1, false, dfPage === pages));
            
            const pi = document.createElement('span'); 
            pi.className = 'df-pi'; 
            pi.textContent = `Page ${{dfPage}}/${{pages}}`; 
            pg.appendChild(pi);
        }}
      }}

      function dfSwitchView(v) {{
        dfView = v; 
        dfPage = 1; 
        dfSort = null; 
        dfDir = 1;
        
        const btnDirty = document.getElementById('btnDirty');
        const btnClean = document.getElementById('btnClean');
        
        if (btnDirty) {{
            if (v === 'dirty') btnDirty.classList.add('active');
            else btnDirty.classList.remove('active');
        }}
        
        if (btnClean) {{
            if (v === 'clean') btnClean.classList.add('active');
            else btnClean.classList.remove('active');
        }}
        
        const search = document.getElementById('dfSearch');
        if (search) search.value = '';
        
        ['dfFItem', 'dfFPay', 'dfFLoc'].forEach(id => {{
            const el = document.getElementById(id);
            if (el) el.value = '';
        }});
        
        dfPopFilters(dfGetData());
        dfRender();
      }}
      """
        
        html_path = 'public/cafe_dashboard.html'
        with open(html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Check if DIRTY_DATA exists, if so, we assume the logic exists and we failed to replace it previously.
        # If not, we append the logic.
        if 'const DIRTY_DATA =' in html_content:
             # Logic exists, but previous replacement failed?
             # Let's try to replace the whole logic block if we can identify it.
             # Or just replace the variable declarations again.
             # But if the file was truncated, we might have lost the logic.
             # Let's assume we need to replace/append.
             pass
        else:
             # Logic missing, append it before the last </script>
             # Find the last </script>
             last_script_idx = html_content.rfind('</script>')
             if last_script_idx != -1:
                 html_content = html_content[:last_script_idx] + js_logic + html_content[last_script_idx:]
                 
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
            
        print("Successfully updated cafe_dashboard.html with new data.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_html()
