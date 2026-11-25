const fields = [
  { name: 'name', label: 'Játékos neve', type: 'text', required: true },
  { name: 'birth_date', label: 'Születési dátum', type: 'date', required: true },
  { name: 'world_ch_won', label: 'Világbajnoki címek száma', type: 'number', min: 0, required: true },
  { name: 'profile_url', label: 'Profil URL', type: 'url' },
  { name: 'image_url', label: 'Kép URL', type: 'url' },
];

const DartForm = ({ initialData = {}, onSubmit, isSaving, submitLabel }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit({
      name: formData.get('name').trim(),
      birth_date: formData.get('birth_date'),
      world_ch_won: Number(formData.get('world_ch_won')),
      profile_url: formData.get('profile_url').trim(),
      image_url: formData.get('image_url').trim(),
    });
  };

  return (
    <form className="dart-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="form-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            min={field.min}
            required={field.required}
            defaultValue={initialData[field.name] ?? ''}
          />
        </div>
      ))}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={isSaving}>
          {isSaving ? 'Mentés…' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default DartForm;