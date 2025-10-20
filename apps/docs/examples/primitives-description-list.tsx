"use client";

const Example = () => (
  <dl className="grid gap-3">
    <div className="grid grid-cols-3 gap-4">
      <dt className="font-medium">Full name</dt>
      <dd className="col-span-2 text-muted-foreground">Connor Love</dd>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <dt className="font-medium">Email address</dt>
      <dd className="col-span-2 text-muted-foreground">connor@example.com</dd>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <dt className="font-medium">Phone number</dt>
      <dd className="col-span-2 text-muted-foreground">+1 (555) 123-4567</dd>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <dt className="font-medium">Address</dt>
      <dd className="col-span-2 text-muted-foreground">
        123 Main St, Columbus, OH 94102
      </dd>
    </div>
  </dl>
);

export default Example;

