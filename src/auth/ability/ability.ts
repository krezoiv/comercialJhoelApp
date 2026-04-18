import { AbilityBuilder, createMongoAbility } from "@casl/ability";

export const defineAbilityFor = (role: string) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (role === "admin") {
    can("manage", "all");
  }

  if (role === "user") {
    can("read", "Dashboard");
    cannot("read", "Usuarios");
  }

  return build();
};
