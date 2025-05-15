'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PollComponent from './poll-component';
import { ChevronUp, ChevronDown, BarChart2, Loader2 } from 'lucide-react';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  _id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

const FeedContent = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedView, setExpandedView] = useState<boolean>(true);

  const fetchPolls = async (preventScroll = false) => {
    try {
      // Only set loading if not preventing scroll
      if (!preventScroll) {
        setLoading(true);
      }
      const response = await axios.get('/api/polls');
      setPolls(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch polls');
      console.error(err);
    } finally {
      if (!preventScroll) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchPolls(); // Initial load should show loading state
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold flex items-center">
          <BarChart2 className="mr-2 h-6 w-6 text-blue-500" />
          College Life Polls
        </h2>
        <button 
          onClick={() => setExpandedView(!expandedView)}
          className="flex items-center text-sm bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors"
        >
          {expandedView ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" /> Collapse
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" /> Expand
            </>
          )}
        </button>
      </motion.div>
      
      {error && (
        <motion.div 
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-blue-500" />
          </motion.div>
          <motion.p 
            className="mt-4 text-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Loading your polls...
          </motion.p>
        </div>
      ) : polls.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={expandedView ? "" : "grid grid-cols-1 md:grid-cols-2 gap-6"}
        >
          {polls.map((poll) => (
            <motion.div key={poll._id} variants={item}>
              <PollComponent 
                poll={poll} 
                onVote={() => fetchPolls(true)} // Pass true to prevent scroll
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-20 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl mb-4">📊</div>
          <p>No polls available at the moment.</p>
        </motion.div>
      )}
    </div>
  );
};

export default FeedContent;
