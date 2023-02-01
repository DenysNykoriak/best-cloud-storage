import {
	BunnyCloudSettingsStateType,
	ScalewayCloudSettingsStateType,
} from "../App";

type ProviderPrices = {
	minPayment?: number;
	maxPayment?: number;
	storagePrice: number;
	transferPrice: number;
};

type CloudProvidersPriceHookParams = {
	storageAmount: number;
	transferAmount: number;
	providers: {
		backbase: ProviderPrices;
		bunny: ProviderPrices & BunnyCloudSettingsStateType;
		scaleway: ProviderPrices & ScalewayCloudSettingsStateType;
		vultr: ProviderPrices;
	};
};

export const useCloudProvidersPrice = ({
	storageAmount,
	transferAmount,
	providers,
}: CloudProvidersPriceHookParams) => {
	const finalPrices: {
		[key in keyof CloudProvidersPriceHookParams["providers"]]: number;
	} = {
		backbase: 0,
		bunny: 0,
		scaleway: 0,
		vultr: 0,
	};

	const cloudProviderNames = Object.keys(
		finalPrices,
	) as (keyof CloudProvidersPriceHookParams["providers"])[];

	const calcCloud = (
		cloudName: keyof CloudProvidersPriceHookParams["providers"],
	) => {
		const providerSettings = providers[cloudName];

		let storagePrice = storageAmount * providerSettings.storagePrice;
		let transferPrice = transferAmount * providerSettings.transferPrice;

		//*Bunny
		if (cloudName === "bunny") {
			let bunnySettings =
				providerSettings as CloudProvidersPriceHookParams["providers"]["bunny"];

			storagePrice =
				storageAmount * (bunnySettings.storageType === "SSD" ? 0.02 : 0.01);
		}

		//*Scaleway
		else if (cloudName === "scaleway") {
			let scalewaySettings =
				providerSettings as CloudProvidersPriceHookParams["providers"]["scaleway"];

			storagePrice =
				(storageAmount - 75) *
				(scalewaySettings.hostType === "SINGLE" ? 0.03 : 0.06);

			transferPrice = (transferAmount - 75) * scalewaySettings.transferPrice;

			if (storageAmount <= 75) storagePrice = 0;
			if (transferAmount <= 75) transferPrice = 0;
		}

		let finalPrice = storagePrice + transferPrice;

		if (providerSettings.minPayment && providerSettings.minPayment > finalPrice)
			finalPrice = providerSettings.minPayment;

		if (providerSettings.maxPayment && providerSettings.maxPayment < finalPrice)
			finalPrice = providerSettings.maxPayment;

		return finalPrice;
	};

	for (const cloudName of cloudProviderNames) {
		finalPrices[cloudName] = calcCloud(cloudName);
	}

	return finalPrices;
};
