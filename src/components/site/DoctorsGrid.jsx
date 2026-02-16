import React from "react";
import { Link } from "react-router-dom";
import { doctors } from "@/data/siteContent";

export function DoctorsGrid({ list }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((d) => (
        <div
          key={d.key}
          className="flex flex-col rounded-2xl bg-gray-50 p-6 shadow-sm"
        >
          <img
            src={d.image}
            alt={d.name}
            className="mx-auto h-24 w-24 rounded-full object-cover shadow"
          />
          <h3 className="mt-4 text-center text-lg font-semibold text-primary">
            {d.name}
          </h3>
          <p className="mt-1 text-center text-xs uppercase tracking-wide text-gray-500">
            {d.department}
          </p>
          <p className="mt-1 text-center text-sm text-gray-600">
            {d.qualification}
          </p>
          <ul className="mt-3 list-disc list-inside space-y-1 overflow-y-auto text-xs text-gray-600">
            {d.expertise.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------
  Layout (Navbar + Footer)
--------------------------------------------------------------------*/
