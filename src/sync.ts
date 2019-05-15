// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@keeveestore/file";
import { readFileSync, writeFileSync } from "fs-extra";
import { safeDump, safeLoad } from "js-yaml";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	// @ts-ignore
	protected dump(rows: Record<K, T>): void {
		writeFileSync(this.uri, safeDump(rows));
	}

	protected load(): void {
		for (const [key, value] of Object.entries(safeLoad(readFileSync(this.uri, "utf8")))) {
			// @ts-ignore
			this.put(key, value);
		}
	}
}
