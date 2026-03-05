export const ForcedDisconnectPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-6">
      <div className="max-w-md rounded-2xl border border-gray-light bg-light p-6 text-center shadow-sm">
        <p className="text-base font-medium text-primary-dark">
          Another active tab is already open for this account.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please close this tab and continue in the other one.
        </p>
      </div>
    </main>
  );
};
