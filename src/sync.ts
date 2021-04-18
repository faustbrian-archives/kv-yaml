// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { ensureFileSync, readFileSync, writeFileSync } from "fs-extra";
import { dump, load } from "js-yaml";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(this.uri, dump(this.all()));
	}

	protected load(): void {
		ensureFileSync(this.uri);

		const content = load(readFileSync(this.uri, "utf8"));

		if (content === undefined) {
			return;
		}

		// @ts-ignore
		for (const [key, value] of Object.entries(content)) {
			// @ts-ignore
			this.put(key, value);
		}
	}
}
