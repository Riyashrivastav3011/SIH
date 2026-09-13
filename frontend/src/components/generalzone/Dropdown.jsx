import { useState, useRef, useEffect } from "react";

function Dropdown({ name, options, value, onChange, placeholder = "Select" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } }); // handleChange ke liye same shape
    setOpen(false);
  };

  // dropdown ke bahar click karne par band ho jaye
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="input-box" ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left px-3 py-2 bg-white rounded flex justify-between"
      >
        {selected?.label || placeholder}
      </button>
      <span>▾</span>

      {open && (
        <ul
          className="absolute w-full mt-1 rounded overflow-hidden z-10"
          style={{ top: "100%", left: 0 }}
        >
          {options.map((o) => (
            <li
              key={o.value}
              onClick={() => handleSelect(o.value)}
              className="px-3 py-2 cursor-pointer bg-[white] text-black hover:bg-[#b68961] hover:text-white"
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;