import { useState, useEffect } from "react";
import { Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

interface Option {
  label: string;
  value: string;
}

interface ComboBoxProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  // Update selected value when value prop changes
  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const handleOptionClick = (newValue: string) => {
    setSelectedValue(newValue);
    onChange(newValue);
    setOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={
            options.find((option) => option.value === selectedValue)?.label ||
            ""
          }
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Select an option..."
          disabled={disabled}
        />
        {open && (
          <div className="absolute bottom-full w-full mb-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-30 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
              >
                {option.label}
                {selectedValue === option.value && (
                  <Check className="ml-2 w-5 h-5 text-black" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
