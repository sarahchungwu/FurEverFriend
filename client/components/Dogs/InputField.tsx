function InputField(props: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.name} className="pl-7 pb-2 text-lg text-yellow-950">
        {props.label}:
      </label>
      <input
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className=" flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
        required
      />
    </div>
  )
}

export default InputField
