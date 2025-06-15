
export function Input({ label, type, placeholder, onChange }: {
  label: string;
  type: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      <input
        className="px-3 py-2 border rounded-md outline-none"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
