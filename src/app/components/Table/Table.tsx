import styles from "./Table.module.css"

type TableParams = {
  head?: any[];
  children: React.ReactNode;
};

export default function Table(params: TableParams) {
  return (
    <table>
      {params.head && <thead>
        <tr>
          {params.head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>}
      <tbody>{params.children}</tbody>
    </table>
  );
}
