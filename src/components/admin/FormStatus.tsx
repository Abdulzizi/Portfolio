// Inline "Saved" / error message shown next to a form's submit button.
// Error and saved are mutually exclusive (an action returns an error OR
// sets saved), so at most one renders.
export function FormStatus({
  saved,
  error,
}: {
  saved?: boolean;
  error?: string;
}) {
  if (error) {
    return <span className="admin-form-msg admin-form-msg--error">{error}</span>;
  }
  if (saved) {
    return <span className="admin-form-msg admin-form-msg--saved">Saved</span>;
  }
  return null;
}
