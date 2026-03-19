import { motion } from "framer-motion";
import { Globe, CheckCircle, MessageCircle } from "lucide-react";

const features = [
  { icon: Globe, label: "Plan Trips", color: "text-primary" },
  { icon: CheckCircle, label: "Track Visits", color: "text-planned" },
  { icon: MessageCircle, label: "Share with Friends", color: "text-secondary" },
];

const BottomNav = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-8 md:gap-16 py-8 border-t border-border"
    >
      {features.map((feat) => (
        <motion.div
          key={feat.label}
          whileHover={{ scale: 1.1, y: -2 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <feat.icon className={`w-5 h-5 ${feat.color}`} />
          <span className="text-sm font-body font-semibold text-foreground">{feat.label}</span>
        </motion.div>
      ))}
    </motion.footer>
  );
};

export default BottomNav;
