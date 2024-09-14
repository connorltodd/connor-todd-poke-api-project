import { CSVLink } from "react-csv";
import Logo from "../assets/poke-api.png";

export default function Header(props: any) {
  return (
    <div className="bg-primary-color-red">
      <div className="flex items-center justify-between w-[1200px] m-auto h-[160px]">
        <div>
          <img src={Logo} height="160" width="160" alt="poke-api" />
        </div>
        <div>
          <div>
            <p className="text-lg text-right text-white font-medium">
              Sort Table
            </p>
            <select
              className="rounded-lg p-2 mt-2"
              onChange={(event) => props.sortTable(event.target.value)}
              defaultValue="default"
            >
              <option disabled value="default">
                Select Option
              </option>
              <option value="alphabetic.desc">Alphabetically, Z-A</option>
              <option value="alphabetic.asc">Alphabetically, A-Z</option>
              <option value="weight.asc">Weight, Low to High</option>
              <option value="weight.desc">Weight, High to Low</option>
            </select>
          </div>
          <div>
            <CSVLink
              data={props.csvDownloadData}
              filename={"pokemon-table-data.csv"}
              className="text-white p-2 mt-3 bg-blue-700 block rounded-lg text-center border-none"
            >
              Download Table Data
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  );
}
