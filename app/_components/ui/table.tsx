import * as React from "react";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cx("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return <thead className={cx("[&_tr]:border-b", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={cx("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cx(
        "border-b border-white/20 transition-colors hover:bg-white/10",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cx(
        "h-10 px-3 text-left align-middle font-medium text-white/90",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td className={cx("p-3 align-middle text-white/85", className)} {...props} />
  );
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption className={cx("mt-4 text-sm text-white/70", className)} {...props} />
  );
}
