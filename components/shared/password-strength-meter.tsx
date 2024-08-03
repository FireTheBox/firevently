import clsx from "clsx";

import { Small } from "../typography/small";

function calculatePasswordStrength(password: string) {
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength;
}

interface PasswordStrengthMeter {
  password: string;
}

export const PasswordStrengthMeter = ({ password }: PasswordStrengthMeter) => {
  const strength = calculatePasswordStrength(password);
  const strengthLabel = ["Fraca", "Média", "Boa", "Forte"][strength] || "Fraca";

  return (
    <div className="space-y-3">
      <div className="flex">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={clsx("mx-1 h-1 flex-1", {
              "bg-red-500": strength === 0 && index === 0,
              "bg-yellow-500": strength === 1 && index <= 1,
              "bg-blue-500": strength === 2 && index <= 2,
              "bg-green-500": strength > 2 && index <= 3,
              "bg-foreground": index > strength,
            })}
          ></div>
        ))}
      </div>
      <Small className="pl-1">{strengthLabel}</Small>
    </div>
  );
};
